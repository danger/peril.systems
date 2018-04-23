import { ApolloClient } from "apollo-boost"
import { HttpLink } from "apollo-boost"
import { InMemoryCache } from "apollo-boost"
import fetch from "isomorphic-unfetch"

declare const process: any
declare const global: any

let apolloClient: ApolloClient<any> = null as any

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState: any) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.PUBLIC_API_ROOT_URL + "api/graphql",
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
