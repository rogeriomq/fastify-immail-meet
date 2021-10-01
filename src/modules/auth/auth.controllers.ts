import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { getToken } from './auth.services'
import { to } from '@/utils'

export const getImmailToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  console.log(request.query)
  const [error, token] = await to(getToken())
  if (error) reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Deu ruim')

  reply.status(StatusCodes.OK).send(token)
}
