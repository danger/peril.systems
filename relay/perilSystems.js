import "isomorphic-fetch"

export function perilSystems(payload) {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Peril Systems",
  }
  return fetch(process.env.PUBLIC_API_ROOT_URL + "/api/graphql"", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        const error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
    .then(response => response.json())
}

export default function query(query: string) {
  return metaphysics({ query }).then(({ data }) => data)
}
