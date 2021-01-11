import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import createApolloClient from './apollo/client'
import App from './App'
const client = createApolloClient()

const Main: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

const rootNode = document.getElementById('root')

ReactDOM.render(<Main />, rootNode)
