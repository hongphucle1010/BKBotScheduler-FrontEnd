'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Trash2 } from 'lucide-react'

interface Member {
  id: number
  email: string
}

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([])
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addMember = () => {
    if (newMemberEmail.trim()) {
      setMembers([...members, { id: Date.now(), email: newMemberEmail }])
      setNewMemberEmail('')
      setIsDialogOpen(false)
    }
  }

  const deleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  return (
    <div className='space-y-4'>
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
            <Button onClick={addMember}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
      {members.map((member) => (
        <div key={member.id} className='flex items-center justify-between'>
          <span>{member.email}</span>
          <Button variant='ghost' size='icon' onClick={() => deleteMember(member.id)}>
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ))}
    </div>
  )
}
