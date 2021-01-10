import express from 'express'
import { sayHi } from '@app/utils'

const app = express()

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
  '/:name',
  async (req, res): Promise<any> => {
    const hi = await sayHi(req.params.name)
    return res.json({ hi })
  },
)

app.listen(3000, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:3000`)
})
