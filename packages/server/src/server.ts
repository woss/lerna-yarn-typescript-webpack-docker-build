import express from 'express'
import { sayHi } from '@app/utils'
import createApolloClient from './apollo/client'
import { getSdk } from './graphql'

const app = express()
const client = createApolloClient()

const graphqlSdk = getSdk(client)

app.use((req, _res, next) => {
  console.log('got request', req.url)
  next()
})

app.get(
  '/',
  async (_req, res): Promise<any> => {
    return res.json({ status: 'running', date: Date.now() })
  },
)
app.get(
  '/favicon.ico',
  async (_req, res): Promise<any> => {
    return res.send()
  },
)
app.get(
  '/:name',
  async (req, res): Promise<any> => {
    const hi = await sayHi(req.params.name)
    return res.json({ hi })
  },
)
app.get(
  '/currency/:currency',
  async (req, res): Promise<any> => {
    const data = await graphqlSdk.GetExchangeRates({
      currency: req.params.currency.toUpperCase(),
    })

    return res.json({ fromCurrency: req.params.currency.toUpperCase(), rates: data.data?.rates })
  },
)

app.listen(3000, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:3000`)
})
