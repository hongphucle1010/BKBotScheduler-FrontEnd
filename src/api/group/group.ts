import { AxiosError } from 'axios'
import { apiClient } from '..'

export async function getMyGroupsApi() {
  try {
    const response = await apiClient.get<GetMyGroupsResponse>('/group/mygroups')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}
