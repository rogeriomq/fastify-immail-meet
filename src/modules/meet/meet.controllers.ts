import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import * as meetServices from './meet.services'
import { getToken } from '@/modules/auth/auth.services'
import { to } from '@/utils'

export const createMeet = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const [errorGetToken, authToken] = await to(getToken())
  if (errorGetToken) reply.status(StatusCodes.BAD_REQUEST).send(errorGetToken)

  const [error, token] = await to(meetServices.createMeetRoom(authToken))
  if (error) reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)

  reply.status(StatusCodes.OK).send(token)
}

export const getParticipantToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  console.log(request.query)
  const [error, token] = await to(getToken())
  if (error) reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Deu ruim')

  reply.status(StatusCodes.OK).send(token)
}
