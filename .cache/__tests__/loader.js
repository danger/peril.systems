import { apiRunner } from "../api-runner-browser"
import loader, { setApiRunnerForLoader } from "../loader.js"

describe(`Loader`, () => {
  beforeEach(() => {
    global.__PATH_PREFIX__ = ``
    setApiRunnerForLoader(apiRunner)
    loader.empty()
    loader.addPagesArray([
      {
        path: `/about/`,
        componentChunkName: `page-component---src-pages-test-js`,
        jsonName: `about.json`,
      },
      {
        path: `/about/me/`,
        componentChunkName: `page-component---src-pages-test-js`,
        jsonName: `about-me.json`,
      },
      {
        path: `/dashboard/`,
        componentChunkName: `page-component---src-pages-dash-js`,
        jsonName: `dashboard.json`,
      },
    ])
  })

  test(`You can enqueue paths`, () => {
    loader.enqueue(`/about/`)

    expect(loader.___resources()).toEqual([
      `about.json`,
      `page-component---src-pages-test-js`,
    ])
  })

  test(`First In, First Out by default`, () => {
    loader.enqueue(`/about/me/`)
    loader.enqueue(`/dashboard/`)
    expect(loader.dequeue()).toEqual(`about-me.json`)
  })

  test(`Paths enqueued more times are prioritized`, () => {
    loader.enqueue(`/about/me/`)
    loader.enqueue(`/about/`)
    loader.enqueue(`/about/`)

    expect(loader.___resources()).toEqual([
      `page-component---src-pages-test-js`,
      `about.json`,
      `about-me.json`,
    ])
  })

  test(`Path duplicates are prioritized`, () => {
    loader.enqueue(`/about/me/`)
    loader.enqueue(`/about/`)

    expect(loader.___resources()).toEqual([
      `page-component---src-pages-test-js`,
      `about-me.json`,
      `about.json`,
    ])
  })

  test(`Path resources are only added once to the queue`, () => {
    loader.enqueue(`/about/me/`)
    loader.enqueue(`/about/`)
    loader.enqueue(`/about/`)
    loader.enqueue(`/about/me/`)
    loader.enqueue(`/about/`)
    loader.enqueue(`/about/me/`)
    expect(loader.___resources().length).toEqual(3)
  })

  test(`You can't enqueue paths that don't exist`, () => {
    expect(loader.enqueue(`/about/me/2`)).toEqual(false)
  })

  test(`Resources are ordered correctly by count`, () => {
    loader.enqueue(`/about/me/`)
    loader.enqueue(`/about/`)
    loader.enqueue(`/about/me/`)
    expect(loader.___resources()).toMatchSnapshot()
  })
})

describe(`Loader path prefixing`, () => {
  let pagesArray

  beforeEach(() => {
    global.__PATH_PREFIX__ = ``

    pagesArray = [
      {
        path: `/about/`,
        componentChunkName: `page-component---src-pages-test-js`,
        jsonName: `about.json`,
      },
      {
        path: `/about/me/`,
        componentChunkName: `page-component---src-pages-test-js`,
        jsonName: `about-me.json`,
      },
    ]

    loader.empty()
  })

  test(`Path prefix present and enabled`, () => {
    global.__PATH_PREFIX__ = `/foo`

    loader.addPagesArray(pagesArray)
    loader.enqueue(`/foo/about/`)

    expect(loader.___resources()).toEqual([
      `about.json`,
      `page-component---src-pages-test-js`,
    ])
  })

  test(`Path prefix missing but enabled`, () => {
    global.__PATH_PREFIX__ = ``

    loader.addPagesArray(pagesArray)

    // don't enqueue prefixed paths
    loader.enqueue(`/foo/about/`)
    expect(loader.___resources()).toEqual([])

    // do enqueue unprefixed paths
    loader.enqueue(`/about/`)
    expect(loader.___resources()).toEqual([
      `about.json`,
      `page-component---src-pages-test-js`,
    ])
  })
})
