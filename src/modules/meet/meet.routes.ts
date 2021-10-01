import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { createMeet, getParticipantToken } from './meet.controllers'

export default function (
  fastify: FastifyInstance,
  options?: FastifyServerOptions,
  done?: any
): void {
  fastify.route({
    method: 'GET',
    url: '/meet/room/create',
    schema: {
      body: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
    handler: createMeet,
  })

  fastify.route({
    method: 'GET',
    url: '/meet/token/participant',
    handler: getParticipantToken,
  })

  done()
}
