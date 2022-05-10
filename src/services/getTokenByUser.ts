import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const { API_URL } = process.env

export type GetTokenByUserParams = {
  username: string
  password: string
}

export const getTokenByUser = async ({
  username,
  password
}: GetTokenByUserParams): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `${API_URL}/auth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: { login: username, password }
  }
  const response: AxiosResponse<{ token?: string }, unknown> =
    await axios.request(options)
  const { token } = response.data
  return { token }
}
