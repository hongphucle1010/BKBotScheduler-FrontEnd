'use client'

import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { useGroupContext } from '../../context/GroupContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { addMemberToGroup, removeUserFromGroup } from '../../api/group/group'

export default function MemberList() {
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { members, setMembers, groupId } = useGroupContext()
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    console.log('members: ', members)
  }, [])

  const addMember = async () => {
    setIsAdding(true)
    if (newMemberEmail.trim()) {
      await addMemberToGroup(groupId, newMemberEmail)
        .then((res) => {
          setMembers([...members, res])
          setNewMemberEmail('')
        })
        .finally(() => {
          setIsAdding(false)
          setIsDialogOpen(false)
        })
    }
  }

  const deleteMember = async (email: string) => {
    await removeUserFromGroup(groupId, email).then(() => {
      setMembers(members.filter((member) => member.email !== email))
    })
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center w-full'>
        <h1 className='text-3xl font-bold'>Members</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <div className='flex space-x-2'>
              <Input
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder='Enter email address'
              />
              <Button
                onClick={addMember}
                disabled={isAdding}
                className={`${isAdding ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-500' : ''}`}
              >
                {isAdding ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.id}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Button variant='ghost' size='icon' onClick={() => deleteMember(member.email)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
