import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { to } from '@/utils'
import { getToken } from '@/services/getToken'
import { createMeetRoom, getMeetRoomToken } from '@/services/createMeetRomToken'

export const createMeetHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const [errorGetToken, authToken] = await to(getToken())
  if (errorGetToken) { return reply.status(StatusCodes.BAD_REQUEST).send(errorGetToken) }

  const [error, token] = await to(createMeetRoom(authToken))
  if (error) return reply.status(StatusCodes.BAD_REQUEST).send(error)

  reply.status(StatusCodes.OK).send(token)
}

export interface IQuerystringGetParticipantToken {
  roomName: string
  moderator?: boolean
}

export const getParticipantTokenHandler = async (
  request: FastifyRequest<{
    Querystring: IQuerystringGetParticipantToken
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { roomName, moderator = false } = request.query
  const [errorGetToken, authToken] = await to(getToken())
  if (errorGetToken) reply.status(StatusCodes.BAD_REQUEST).send(errorGetToken)

  const [errorRoomToken, authRoomToken] = await to(
    getMeetRoomToken(authToken, roomName, moderator)
  )
  if (errorRoomToken) { reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorRoomToken) }

  reply.status(StatusCodes.OK).send(authRoomToken)
}
