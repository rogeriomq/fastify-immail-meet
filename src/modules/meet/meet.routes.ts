import { FastifyInstance, FastifyServerOptions } from 'fastify'
import {
  createMeet,
  getParticipantToken,
  IQuerystringGetParticipantToken,
} from './meet.controllers'

export default function (
  fastify: FastifyInstance,
  options?: FastifyServerOptions,
  done?: any
): void {
  fastify.route({
    method: 'GET',
    url: '/meet/room/create',
    handler: createMeet,
  })

  fastify.route<{
    Querystring: IQuerystringGetParticipantToken
  }>({
    method: 'GET',
    url: '/meet/token/participant',
    handler: getParticipantToken,
  })

  done()
}
