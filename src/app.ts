import Fastify, { FastifyInstance } from 'fastify'
import fastifyCors from 'fastify-cors'
import printRoutes from '@/plugins/fastify/print-routes'
import { to } from '@/utils'
import { authModule } from '@/modules'

const fastify: FastifyInstance = Fastify({
  logger: {
    prettyPrint: {
      levelFirst: false,
      translateTime: 'yyyy-MM-dd HH:mm:ss.l',
      ignore: 'pid,hostname',
    },
  },
})

// global plugins
fastify.register(fastifyCors, { origin: true })
fastify.register(printRoutes)

// routes
fastify.register(authModule.routes)

// upstart server
const bootstrap = async (): Promise<void> => {
  const [error] = await to(fastify.listen(4000, '0.0.0.0'))
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

export { fastify, bootstrap }
