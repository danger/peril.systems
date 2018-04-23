import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const HERO_QUERY = gql`
  query GetCharacter($episode: Episode!) {
    hero(episode: $episode) {
      name
      id
      friends {
        name
        id
        appearsIn
      }
    }
  }
`

type Hero = {
  name: string
  id: string
  appearsIn: string[]
  friends: Hero[]
}

type Response = {
  hero: Hero
}

type Variables = {
  episode: string
}

// note the first parameter is empty here, we will exaplain that below
const withCharacter = graphql<{}, Response, Variables>(HERO_QUERY, {
  options: () => ({
    variables: { episode: "JEDI" },
  }),
})

export default withCharacter(({ data: { loading, hero, error } }) => {
  if (loading) return <div>Loading</div>
  if (error) return <h1>ERROR</h1>
  return <p>hi</p>
})
