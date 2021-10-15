import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const { API_URL } = process.env

export const createMeetRoom = async (authToken: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `${API_URL}/v2/videoconference/schedule`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    /**
     * Details of body in:
     * https://docs.immail.ca/#req_8625e52fab6244bc907c11c85568b6b6
     */
    data: {
      topic: 'Consultation',
      duration: 60,
    },
  }
  const response = await axios(options)
  return response.data
}

export const getMeetRoomToken = async (
  authToken: string,
  roomName: string,
  moderator = false
): Promise<{ token: string }> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `${API_URL}/v2/videoconference/token`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    data: { room_name: roomName, moderator },
  }

  const response: AxiosResponse<{ token: string }, unknown> =
    await axios.request(options)
  const { token } = response.data
  return { token }
}
