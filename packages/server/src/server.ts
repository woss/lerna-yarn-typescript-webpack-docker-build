import express from 'express'
import { sayHi } from '@app/utils'
const app = express()

app.get(
  '/',
  async (_req, res): Promise<any> => {
    const hi = await sayHi('ok')
    return res.json({ status: hi })
  },
)

app.listen(3000, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:3000`)
})
