import { GraphQLClient } from 'graphql-request'
import fetch from 'cross-fetch'

const graphqlEndpoint = 'https://48p1r2roz4.sse.codesandbox.io'

export default function createApolloClient(): GraphQLClient {
  const client = new GraphQLClient(graphqlEndpoint, {
    headers: {
      authorization: 'Bearer MY_TOKEN',
    },
    fetch,
  })
  return client
}
