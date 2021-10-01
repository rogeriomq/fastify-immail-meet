import Fastify, { FastifyInstance } from 'fastify'
import fastifyCors from 'fastify-cors'
import printRoutes from '@/plugins/fastify/print-routes'
import { to } from '@/utils'
import * as modules from '@/modules'

const fastify: FastifyInstance = Fastify({
  logger: {
    prettyPrint: {
      levelFirst: false,
      translateTime: 'yyyy-MM-dd HH:mm:ss.l',
      ignore: 'pid,hostname',
    },
  },
  ignoreTrailingSlash: true,
})

// global plugins
fastify.register(fastifyCors, { origin: true })
fastify.register(printRoutes)

//  define prefix on all routes
fastify.register(
  (fastify, _, done) => {
    // register modules/routes
    Object.keys(modules).forEach(mod => {
      fastify.register(modules[mod].routes)
    })
    done()
  },
  { prefix: '/api' }
)

// upstart server
const { PORT } = process.env
const bootstrap = async (): Promise<void> => {
  const [error] = await to(fastify.listen(PORT || 4000, '0.0.0.0'))
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

export { fastify, bootstrap }
