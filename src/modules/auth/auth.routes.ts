import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { authByToken, authByUserLogin } from './auth.controllers'

export default function (
  fastify: FastifyInstance,
  options?: FastifyServerOptions,
  done?: any
): void {
  fastify.route({
    method: 'POST',
    url: '/auth/user-login',
    schema: {
      body: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
    handler: authByUserLogin,
  })

  fastify.route({
    method: 'GET',
    url: '/auth/api-login',
    handler: authByToken,
  })

  done()
}