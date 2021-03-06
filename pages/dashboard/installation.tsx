import React, { Component } from "react"
import { graphql } from "react-relay"
import withData from "../../lib/withData"
import InstallationRules from "../../components/admin/installation/InstallationRules"
import InstallationWebhooks from "../../components/admin/installation/InstallationWebhooks"

class installation extends Component<any> {
  render() {
    return (
      <div>
        <p>Installation</p>
        <InstallationRules installation={this.props.node} />
        <InstallationWebhooks installation={this.props.node} />
      </div>
    )
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
