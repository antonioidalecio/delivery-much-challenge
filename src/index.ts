import dotenv from 'dotenv'

import server from './server'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

const port = process.env.APP_PORT || 3000

server.listen(port, () => console.log(`Listening on port ${port}`))
