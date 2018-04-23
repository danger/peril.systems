const thisServer = process.env.PUBLIC_WEB_ROOT_URL

/** URL to the main dashboard */
export const dashboardURL = thisServer + "/dashboard"
/** URL send someone to log into Peril */
export const loginURL =
  process.env.PUBLIC_API_ROOT_URL + "/api/auth/peril/github/start?redirect=" + encodeURIComponent(dashboardURL)
/** URL to add Peril to an org */
export const addPerilURL = process.env.PUBLIC_API_ROOT_URL + "/api/integrate/github"
