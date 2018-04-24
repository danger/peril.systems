import React, { Component } from "react"
import { graphql } from "react-relay"
import InstallationsToSetUp from "../../components/admin/dashboard/InstallationsToSetUp"
import withData from "../../lib/withData"
import { dashboard_indexQueryResponse } from "./__generated__/dashboard_indexQuery.graphql"

class Index extends Component<dashboard_indexQueryResponse> {
  render() {
    if (!this.props.me) {
      return <div>Loading</div>
    }
    return (
      <div>
        <p>Hi {this.props.me.name}</p>
        <InstallationsToSetUp user={this.props.me as any} />
      </div>
    )
  }
}

export default withData(Index, {
  query: graphql`
    query dashboard_indexQuery {
      me {
        ...InstallationsToSetUp_user
        name
      }
    }
  `,
})
