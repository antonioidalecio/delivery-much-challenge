import cors from 'cors'
import express from 'express'

import { handleGenericErrors } from './middleware/error'
import { routeNotFound } from './middleware/route-not-found'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)
app.use(routeNotFound)

app.use(handleGenericErrors)

export default app
