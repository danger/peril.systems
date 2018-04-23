import React, { Component } from "react"
import { graphql } from "react-relay"
import withData from "../../lib/withData"
import { dashboard_indexQueryResponse } from "./__generated__/dashboard_indexQuery.graphql"

class Index extends Component<dashboard_indexQueryResponse> {
  static displayName = `Index`

  render() {
    return (
      <div>
        <p>Hi {this.props.me}</p>
      </div>
    )
  }
}

export default withData(Index, {
  query: graphql`
    query dashboard_indexQuery {
      me {
        name
      }
    }
  `,
})
