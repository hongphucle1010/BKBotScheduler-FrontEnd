import { Member } from '../../lib/types/entity'

interface GetMyGroupsResponse {
  groups: Group[]
}

interface CreateGroup {
  name: string
  description: string
  avatar?: string
}

type GroupDetail = Omit<Group, 'numMember' | 'createTime'> & {
  users: Member[]
}
