import axios, { AxiosRequestConfig } from 'axios'

const { API_URL } = process.env

export const createMeetRoom = async (authToken: string): Promise<any> => {
  console.log('AuthToken:', authToken)
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `${API_URL}/v2/videoconference/schedule`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    data: {},
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

  const response = await axios(options)
  const { token } = response.data
  return { token }
}
