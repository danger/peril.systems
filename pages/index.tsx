import { loginURL, addPerilURL } from "lib/routes";

export default () => 
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
