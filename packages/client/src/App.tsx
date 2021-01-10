import { gql, useQuery } from '@apollo/client'
import * as React from 'react'

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "EUR") {
      currency
      rate
    }
  }
`
const App = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h1>Exchange rates from EUR to :</h1>
      <div>
        {data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
