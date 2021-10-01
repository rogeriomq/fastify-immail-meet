import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { getToken, getTokenByUser } from './auth.services'
import { to } from '@/utils'

export type BodyUserLogin = {
  username: string
  password: string
}

export const authByUserLogin = async (
  request: FastifyRequest<{ Body: BodyUserLogin }>,
  reply: FastifyReply
): Promise<void> => {
  const { username, password } = request.body
  const [error, token] = await to(getTokenByUser({ username, password }))
  if (error) reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Deu ruim')

  reply.status(StatusCodes.OK).send(token)
}

export const authByToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  console.log(request.query)
  const [error, token] = await to(getToken())
  if (error) reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Deu ruim')

  reply.status(StatusCodes.OK).send(token)
}