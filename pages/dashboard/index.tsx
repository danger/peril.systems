import React, { Component } from "react"
import { graphql } from "react-relay"
import InstallationsToSetUp from "../../components/admin/dashboard/InstallationsToSetUp"
import withData from "../../lib/withData"
import { dashboard_indexQueryResponse } from "./__generated__/dashboard_indexQuery.graphql"
import InstallationsOverview from "../../components/admin/dashboard/InstallationsOverview"

class Index extends Component<dashboard_indexQueryResponse> {
  render() {
    if (!this.props.me) {
      return <div>Not authenticated, redirecting to log in</div>
    }
    return (
      <div>
        <p>Hi {this.props.me.name}</p>
        <InstallationsOverview user={this.props.me as any} />
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
        ...InstallationsOverview_user
        name
      }
    }
  `,
})
