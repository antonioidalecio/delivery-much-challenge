import 'cross-fetch/polyfill'

import { APP_PORT } from './config'
import server from './server'

server.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`))
