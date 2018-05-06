declare const process: any

import { Environment, Network, RecordSource, Store } from "relay-runtime"
import fetch from "isomorphic-unfetch"

let relayEnvironment: Environment | null = null

interface JWTAble {
  jwt: string | undefined
  records?: any
}

// Define a function that returns the fetch for the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = (ctx: JWTAble) => (operation: any, variables: any, _: any, __: any) => {
  let auth = !ctx.jwt ? {} : { Authorization: `Basic ${ctx.jwt}` }

  return fetch(process.env.PUBLIC_API_ROOT_URL + "/api/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...auth,
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  })
    .then((response: any) => {
      return response.json()
    })
    .then((json: any) => {
      return json
    })
}

export default function initEnvironment(ctx: JWTAble) {
  // Create a network layer from the fetch function
  const network = Network.create(fetchQuery(ctx))
  const store = new Store(new RecordSource(ctx.records || {}))

  // Make sure to create a new Relay environment for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return new Environment({
      network,
      store,
    })
  }

  // reuse Relay environment on client-side
  if (!relayEnvironment) {
    relayEnvironment = new Environment({
      network,
      store,
    })
  }

  return relayEnvironment
}
