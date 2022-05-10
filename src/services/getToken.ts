import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const { API_URL, EMAIL_DOMAIN, API_KEY } = process.env

export const getToken = async (): Promise<string> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `${API_URL}/auth/token`,
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': API_KEY
    },
    data: { email_domain: EMAIL_DOMAIN }
  }

  const response: AxiosResponse<{ token?: string }, unknown> =
    await axios.request(options)
  const { token } = response.data

  return token
}
