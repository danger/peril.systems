import React from "react"
import initEnvironment from "./createEnvironment"
import { fetchQuery } from "react-relay"
import RelayProvider from "./RelayProvider"
import cookie from "cookie"
import { Environment } from "relay-runtime"

interface WithDataProps {
  jwt: string
  queryRecords: any
}

export default (ComposedComponent: any, options: { query?: any; variables?: any } = {}) => {
  return class WithData extends React.Component<WithDataProps> {
    static displayName = `WithData(${ComposedComponent.displayName})`

    static async getInitialProps(ctx: any) {
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      const c = ctx.req.headers.cookie
      const cookies = c && typeof c === "string" && cookie.parse(c)
      const jwt = cookies && cookies.jwt

      let queryProps = {}
      let queryRecords = {}
      const environment = initEnvironment({ jwt })

      if (options.query) {
        const variables = (options.variables && options.variables(ctx)) || {}
        // TODO: Consider RelayQueryResponseCache
        // https://github.com/facebook/relay/issues/1687#issuecomment-302931855
        queryProps = await fetchQuery(environment, options.query, variables)
        queryRecords = environment
          .getStore()
          .getSource()
          .toJSON()
      }

      return {
        ...composedInitialProps,
        ...queryProps,
        queryRecords,
        jwt,
      }
    }

    environment: Environment

    constructor(props: any) {
      super(props)
      this.environment = initEnvironment({
        jwt: props.jwt,
        records: props.queryRecords,
      })
    }

    render() {
      return (
        <RelayProvider environment={this.environment} variables={{}}>
          <ComposedComponent {...this.props} />
        </RelayProvider>
      )
    }
  }
}
