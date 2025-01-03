import { AxiosError } from 'axios'
import { apiClient } from '..'
import { Group } from '../../lib/redux/reducers/types'
import { GetMyGroupsResponse, CreateGroup, GroupDetail } from './types'
import { Member } from '../../lib/types/entity'

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

export async function getGroupDetail(groupId: string): Promise<GroupDetail> {
  try {
    const response = await apiClient.get(`/group/${groupId}`)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function createGroup(data: CreateGroup): Promise<Group> {
  try {
    const response = await apiClient.post('/group/new', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function addMemberToGroup(groupId: string, email: string): Promise<Member> {
  try {
    const response = await apiClient.post(`/group/add/`, {
      groupId,
      email
    })

    const member: Member = {
      email: response.data.email,
      name: response.data.name,
      id: response.data.id
    }

    return member
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function removeUserFromGroup(groupId: string, email: string): Promise<void> {
  try {
    await apiClient.put(`/group/remove/`, {
      groupId,
      email
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}
