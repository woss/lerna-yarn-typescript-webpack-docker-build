import { ApolloClient, createHttpLink, NormalizedCacheObject, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
// import { getLocalAccessToken } from '../utils/getTokens'
// import { cache } from './cache'

const httpLink = createHttpLink({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  // credentials: 'same-origin', // enable this when we move to the api
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = getLocalAccessToken()
  // return the headers to the context so httpLink can read them
  const token = null
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      // add this when we need it
      // 'client-name': 'SensioPhoto[web]',
      // 'client-version': '0.1.0',
    },
  }
})

export default function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  // const accessToken = getLocalAccessToken()
  const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
  })
  return client
}
