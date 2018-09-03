import pageFinderFactory from "./find-page"
import emitter from "./emitter"
import stripPrefix from "./strip-prefix"

const preferDefault = m => (m && m.default) || m

let prefetcher
let inInitialRender = true
let hasFetched = Object.create(null)
let syncRequires = {}
let asyncRequires = {}
let jsonDataPaths = {}
let fetchHistory = []
let fetchingPageResourceMapPromise = null
let fetchedPageResourceMap = false
let apiRunner
const failedPaths = {}
const failedResources = {}
const MAX_HISTORY = 5

const jsonPromiseStore = {}

/**
 * Fetch resource map (pages data and paths to json files with results of
 *  queries)
 */
const fetchPageResourceMap = () => {
  if (!fetchingPageResourceMapPromise) {
    fetchingPageResourceMapPromise = new Promise(resolve => {
      asyncRequires.data().then(({ pages, dataPaths }) => {
        // TODO — expose proper way to access this data from plugins.
        // Need to come up with an API for plugins to access
        // site info.
        window.___dataPaths = dataPaths
        queue.addPagesArray(pages)
        queue.addDataPaths(dataPaths)
        resolve((fetchedPageResourceMap = true))
      })
    })
  }
  return fetchingPageResourceMapPromise
}

const fetchResource = resourceName => {
  // Find resource
  let resourceFunction
  if (resourceName.slice(0, 12) === `component---`) {
    resourceFunction = asyncRequires.components[resourceName]
  } else {
    if (resourceName in jsonPromiseStore) {
      resourceFunction = () => jsonPromiseStore[resourceName]
    } else {
      resourceFunction = () => {
        const fetchPromise = new Promise((resolve, reject) => {
          const url = `${__PATH_PREFIX__}/static/d/${
            jsonDataPaths[resourceName]
          }.json`
          var req = new XMLHttpRequest()
          req.open(`GET`, url, true)
          req.withCredentials = true
          req.onreadystatechange = () => {
            if (req.readyState == 4) {
              if (req.status === 200) {
                resolve(JSON.parse(req.responseText))
              } else {
                reject()
              }
            }
          }
          req.send(null)
        })
        jsonPromiseStore[resourceName] = fetchPromise
        return fetchPromise
      }
    }
  }

  // Download the resource
  hasFetched[resourceName] = true
  return new Promise(resolve => {
    const fetchPromise = resourceFunction()
    let failed = false
    return fetchPromise
      .catch(() => {
        failed = true
      })
      .then(component => {
        fetchHistory.push({
          resource: resourceName,
          succeeded: !failed,
        })

        if (!failedResources[resourceName]) {
          failedResources[resourceName] = failed
        }

        fetchHistory = fetchHistory.slice(-MAX_HISTORY)

        resolve(component)
      })
  })
}

const getResourceModule = resourceName =>
  fetchResource(resourceName).then(preferDefault)

// Prefetcher logic
if (process.env.NODE_ENV === `production`) {
  prefetcher = require(`./prefetcher`)({
    fetchNextResource: () => {
      let next = queue.dequeue()
      return next && fetchResource(next)
    },
  })

  emitter.on(`onPreLoadPageResources`, e => {
    prefetcher.onPreLoadPageResources(e)
  })
  emitter.on(`onPostLoadPageResources`, e => {
    prefetcher.onPostLoadPageResources(e)
  })
}

const appearsOnLine = () => {
  const isOnLine = navigator.onLine
  if (typeof isOnLine === `boolean`) {
    return isOnLine
  }

  // If no navigator.onLine support assume onLine if any of last N fetches succeeded
  const succeededFetch = fetchHistory.find(entry => entry.succeeded)
  return !!succeededFetch
}

const handleResourceLoadError = (path, message) => {
  if (!failedPaths[path]) {
    failedPaths[path] = message
  }

  if (
    appearsOnLine() &&
    window.location.pathname.replace(/\/$/g, ``) !== path.replace(/\/$/g, ``)
  ) {
    window.location.pathname = path
  }
}

// Note we're not actively using the path data atm. There
// could be future optimizations however around trying to ensure
// we load all resources for likely-to-be-visited paths.
// let pathArray = []
// let pathCount = {}

let resourcesCount = Object.create(null)
const sortResourcesByCount = (a, b) => {
  if (resourcesCount[a] > resourcesCount[b]) return 1
  else if (resourcesCount[a] < resourcesCount[b]) return -1
  else return 0
}

let findPage
let pathScriptsCache = {}
let resourcesArray = []
let mountOrder = 1
let prefetchTriggered = {}
let disableCorePrefetching = false

const queue = {
  empty: () => {
    resourcesCount = Object.create(null)
    resourcesArray = []
  },
  addPagesArray: newPages => {
    findPage = pageFinderFactory(newPages, __PATH_PREFIX__)
  },
  addDevRequires: devRequires => {
    syncRequires = devRequires
  },
  addProdRequires: prodRequires => {
    asyncRequires = prodRequires
  },
  addDataPaths: dataPaths => {
    jsonDataPaths = dataPaths
  },
  dequeue: () => resourcesArray.pop(),
  // Hovering on a link is a very strong indication the user is going to
  // click on it soon so let's start prefetching resources for this
  // pathname.
  hovering: rawPath => {
    const path = stripPrefix(rawPath, __PATH_PREFIX__)
    queue.getResourcesForPathname(path)
  },
  enqueue: rawPath => {
    const path = stripPrefix(rawPath, __PATH_PREFIX__)
    if (!apiRunner)
      console.error(`Run setApiRunnerForLoader() before enqueing paths`)

    // Tell plugins with custom prefetching logic that they should start
    // prefetching this path.
    if (!prefetchTriggered[path]) {
      apiRunner(`onPrefetchPathname`, { pathname: path })
      prefetchTriggered[path] = true
    }

    // If a plugin has disabled core prefetching, stop now.
    if (disableCorePrefetching.some(a => a)) {
      return false
    }

    // Check if the page exists.
    let page = findPage(path)

    if (
      process.env.NODE_ENV === `production` &&
      !page &&
      !fetchedPageResourceMap
    ) {
      // If page wasn't found check and we didn't fetch resources map for
      // all pages, wait for fetch to complete and try find page again
      return fetchPageResourceMap().then(() => queue.enqueue(rawPath))
    }

    if (!page) {
      return false
    }

    const mountOrderBoost = 1 / mountOrder
    mountOrder += 1

    function enqueueResource(resourceName) {
      if (!resourceName) return
      if (!resourcesCount[resourceName]) {
        resourcesCount[resourceName] = 1 + mountOrderBoost
      } else {
        resourcesCount[resourceName] += 1 + mountOrderBoost
      }

      // Before adding, checking that the resource isn't either
      // already queued or been downloading.
      if (hasFetched[resourceName] || resourcesArray.includes(resourceName))
        return

      resourcesArray.unshift(resourceName)
    }

    // Add resources to queue.
    enqueueResource(page.jsonName)
    enqueueResource(page.componentChunkName)

    // Sort resources by resourcesCount.
    resourcesArray.sort(sortResourcesByCount)

    if (process.env.NODE_ENV === `production`) {
      prefetcher.onNewResourcesAdded()
    }

    return true
  },

  getPage: pathname => findPage(pathname),

  getResourcesForPathname: (path, cb = () => {}) => {
    if (
      inInitialRender &&
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.state === `activated`
    ) {
      // If we're loading from a service worker (it's already activated on
      // this initial render) and we can't find a page, there's a good chance
      // we're on a new page that this (now old) service worker doesn't know
      // about so we'll unregister it and reload.
      if (!findPage(path)) {
        navigator.serviceWorker
          .getRegistrations()
          .then(function(registrations) {
            // We would probably need this to
            // prevent unnecessary reloading of the page
            // while unregistering of ServiceWorker is not happening
            if (registrations.length) {
              for (let registration of registrations) {
                registration.unregister()
              }

              window.location.reload()
            }
          })
      }
    }
    const doingInitialRender = inInitialRender
    inInitialRender = false
    // In development we know the code is loaded already
    // so we just return with it immediately.
    if (process.env.NODE_ENV !== `production`) {
      const page = findPage(path)
      if (!page) {
        cb()
        return null
      }
      const pageResources = {
        component: syncRequires.components[page.componentChunkName],
        page,
      }
      cb(pageResources)
      return pageResources
    }
    // Production code path
    if (failedPaths[path]) {
      handleResourceLoadError(
        path,
        `Previously detected load failure for "${path}"`
      )
      cb()
      return null
    }
    const page = findPage(path)

    if (!page && !fetchedPageResourceMap) {
      // If page wasn't found check and we didn't fetch resources map for
      // all pages, wait for fetch to complete and try to get resources again
      fetchPageResourceMap().then(() => {
        queue.getResourcesForPathname(path, cb)
      })
      return null
    }

    if (!page) {
      console.log(`A page wasn't found for "${path}"`)
      cb()
      return null
    }

    // Use the path from the page so the pathScriptsCache uses
    // the normalized path.
    path = page.path

    // Check if it's in the cache already.
    if (pathScriptsCache[path]) {
      Promise.resolve().then(() => {
        cb(pathScriptsCache[path])
        emitter.emit(`onPostLoadPageResources`, {
          page,
          pageResources: pathScriptsCache[path],
        })
      })
      return pathScriptsCache[path]
    }

    emitter.emit(`onPreLoadPageResources`, { path })
    // Nope, we need to load resource(s)

    Promise.all([
      getResourceModule(page.componentChunkName),
      getResourceModule(page.jsonName),
    ]).then(([component, json]) => {
      const pageResources = { component, json, page }

      pathScriptsCache[path] = pageResources
      cb(pageResources)

      emitter.emit(`onPostLoadPageResources`, {
        page,
        pageResources,
      })

      if (doingInitialRender) {
        // We got all resourecs needed for first mount,
        // we can fetch resoures for all pages.
        fetchPageResourceMap()
      }
    })

    return null
  },

  // for testing
  ___resources: () => resourcesArray.slice().reverse(),
}

export const setApiRunnerForLoader = runner => {
  apiRunner = runner
  disableCorePrefetching = apiRunner(`disableCorePrefetching`)
}

export const publicLoader = {
  getResourcesForPathname: queue.getResourcesForPathname,
}

export default queue
