import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { getImmailToken } from './auth.controllers'

export default function (
  fastify: FastifyInstance,
  options?: FastifyServerOptions,
  done?: any
): FastifyInstance {
  fastify.get('/auth', getImmailToken)
  return done()
}
