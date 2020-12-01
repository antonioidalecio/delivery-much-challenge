import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import routes from './routes'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

const port = process.env.APP_PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.listen(port, () => console.log(`listening on port ${port}`))
