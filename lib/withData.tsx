import React from "react"
import PropTypes from "prop-types"
import { ApolloProvider, getDataFromTree } from "react-apollo"
import Head from "next/head"
import initApollo from "./apollo"
import { ApolloClient } from "apollo-boost"

declare const process: any

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component: any) {
  return Component.displayName || Component.name || "Unknown"
}

export default (ComposedComponent: any) => {
  return class WithData extends React.Component {
    apollo: ApolloClient<any>

    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    static propTypes = {
      serverState: PropTypes.object.isRequired,
    }

    static async getInitialProps(ctx: any) {
      // Initial serverState with apollo (empty)
      let serverState

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      const AnyComposeC: any = ComposedComponent
      if (AnyComposeC.getInitialProps) {
        composedInitialProps = await AnyComposeC.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({})
      try {
        const getData: any = getDataFromTree
        // Run all GraphQL queries
        await getData(<AnyComposeC ctx={ctx} {...composedInitialProps} />, {
          router: {
            asPath: ctx.asPath,
            pathname: ctx.pathname,
            query: ctx.query,
          },
          client: apollo,
        })
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      serverState = {
        apollo: {
          data: apollo.cache.extract(),
        },
      }

      return {
        serverState,
        ...composedInitialProps,
      }
    }

    constructor(props: any) {
      super(props)
      this.apollo = initApollo(props.serverState.apollo.data)
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
