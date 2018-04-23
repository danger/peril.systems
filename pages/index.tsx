export default () => {
  const thisServer = process.env.PUBLIC_WEB_ROOT_URL
  const dashboardURL = thisServer + "/dashboard"
  const loginURL =
    process.env.PUBLIC_API_ROOT_URL + "/api/auth/peril/github/start?redirect=" + encodeURIComponent(dashboardURL)
  const addPerilURL = process.env.PUBLIC_API_ROOT_URL + "/api/integrate/github"
  return (
    <html>
      <body>
        <div style={{ textAlign: "center", paddingTop: "90px", fontFamily: "Avenir Next" }}>
          <p>Say hi to</p>
          <p>
            <img src="http://danger.systems/images/js/peril-logo-hero-cachable@2x.png" />
          </p>
          <p>
            <a href={loginURL}>Login to staging</a>
          </p>
          <p>
            <a href={addPerilURL}>Add Peril to your org</a>
          </p>
        </div>
      </body>
    </html>
  )
}
