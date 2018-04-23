// import { Environment, Network, RecordSource, Store } from "relay-runtime"
// import { perilSystems } from "./perilSystems"

// export function createEnvironment() {
//   const fetchQuery = (operation, variables, cacheConfig) => {
//     return perilSystems({ query: operation.text, variables })
//   }
//   const network = Network.create(fetchQuery)
//   const source = new RecordSource()
//   const store = new Store(source)
//   return new Environment({
//     network,
//     store,
//   })
// }

declare const process: any

import { Environment, Network, RecordSource, Store } from "relay-runtime"
import fetch from "isomorphic-unfetch"

let relayEnvironment: any = null

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation: any, variables: any, _: any, __: any) {
  console.log(operation)
  return fetch(process.env.PUBLIC_API_ROOT_URL + "/api/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  })
    .then((response: any) => {
      return response.json()
    })
    .then((json: any) => {
      console.log(json)
      return json
    })
}

export default function initEnvironment({ records = {} } = {}) {
  // Create a network layer from the fetch function
  const network = Network.create(fetchQuery)
  const store = new Store(new RecordSource(records))

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
