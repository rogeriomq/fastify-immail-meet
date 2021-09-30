import Fastify from 'fastify'

const fastify = Fastify({
  logger: {
    prettyPrint: true,
  },
})

const bootstrap = async (): Promise<void> => {
  await fastify.listen(4000, '0.0.0.0')
}

export { fastify, bootstrap }
