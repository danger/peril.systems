import React, { Component } from "react"
import { graphql } from "react-relay"
import withData from "../../lib/withData"
import InstallationRules from "../../components/admin/installation/InstallationRules"
import InstallationWebhooks from "../../components/admin/installation/InstallationWebhooks"
import Head from "next/head"

declare const Primus: any

class installation extends Component<any> {
  render() {
    return (
      <html>
        <Head>
          <title>OK</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script src="http://localhost:5000/scripts/primus.js" />
        </Head>

        <div>
          <p>Installation</p>
          <InstallationRules installation={this.props.node} />
          <InstallationWebhooks installation={this.props.node} />
        </div>
      </html>
    )
  }
  componentDidMount() {
    if (!process) {
      // client side only
      console.log("Connecting to Peril's webserver")
      const primus = new Primus("http://localhost:5000")

      const getCookie = name => {
        var re = new RegExp(name + "=([^;]+)")
        var value = re.exec(document.cookie)
        return value != null ? unescape(value[1]) : null
      }

      primus.on("connection", spark => {
        spark.on("data", data => {
          console.log("rando: ", data)
        })

        spark.write({ foo: "bar" })
      })

      primus.on("disconnection", spark => {
        console.log("nokay")
      })
    }
  }
}

export default withData(installation, {
  query: graphql`
    query installationQuery($installationID: ID!) {
      node(id: $installationID) {
        id
        ...InstallationRules_installation
        ...InstallationWebhooks_installation
      }
    }
  `,
  variables: (props: any) => ({
    installationID: props.query.id,
  }),
})
