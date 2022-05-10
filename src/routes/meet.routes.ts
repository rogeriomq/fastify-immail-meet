import { FastifyInstance, FastifyServerOptions } from 'fastify'
import {
  createMeetHandler,
  getParticipantTokenHandler,
  IQuerystringGetParticipantToken
} from '@/handlers/meetHandlers'

export function meetRoutes (
  fastify: FastifyInstance,
  options?: FastifyServerOptions,
  done?: any
): void {
  fastify.route({
    method: 'GET',
    url: '/meet/room/create',
    handler: createMeetHandler
  })

  fastify.route<{
    Querystring: IQuerystringGetParticipantToken
  }>({
    method: 'GET',
    schema: {
      // Parse querystring to object
      querystring: {
        roomName: { type: 'string' },
        moderator: { type: 'boolean' }
      }
    },
    url: '/meet/token/participant',
    handler: getParticipantTokenHandler
  })

  done()
}
