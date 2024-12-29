import { GroupElementProps } from '../types/entity'

export const createGroup = async ({
  name,
  description,
  avatar
}: Partial<GroupElementProps>): Promise<GroupElementProps> => {
  console.log('createGroup', name, description, avatar)
  const res: GroupElementProps = {
    groupId: '3',
    name: name ? name : 'name',
    description: description ? description : 'description',
    numberOfMembers: 0,
    avatar: avatar ? avatar : 'https://via.placeholder.com/150'
  }
  return res
}
