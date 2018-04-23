import { loginURL } from "../lib/routes"

export default () => (
  <html>
    <body>
      <div style={{ textAlign: "center", paddingTop: "90px", fontFamily: "Avenir Next" }}>
        <p>Added successfully!</p>
        <p>
          Next up: <a href={loginURL}>Login to Peril</a>
        </p>
      </div>
    </body>
  </html>
)
