import { Avatar } from 'flowbite-react'

interface GroupElementProps {
  name: string
  description: string
  numberOfMembers: number
  avatar: string
}

const GroupElement = ({ name, description, numberOfMembers, avatar }: GroupElementProps) => {
  return (
    <div className='group-element'>
      <Avatar alt={`${name} avatar`} img={avatar} />
      <h3>{name}</h3>
      <p>{description}</p>
      <span>{numberOfMembers} members</span>
    </div>
  )
}

const fakeGroups: GroupElementProps[] = [
  {
    name: 'Group Alpha',
    description: 'This is the Alpha group.',
    numberOfMembers: 10,
    avatar: 'https://via.placeholder.com/150'
  },
  {
    name: 'Group Beta',
    description: 'This is the Beta group.',
    numberOfMembers: 8,
    avatar: 'https://via.placeholder.com/150'
  }
]

const GroupManagementPage = () => {
  return (
    <div>
      <p>Nhóm của tôi</p>
      <div className='flex flex-wrap'>
        {fakeGroups.map((group, index) => (
          <GroupElement
            key={index}
            name={group.name}
            description={group.description}
            numberOfMembers={group.numberOfMembers}
            avatar={group.avatar}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupManagementPage
