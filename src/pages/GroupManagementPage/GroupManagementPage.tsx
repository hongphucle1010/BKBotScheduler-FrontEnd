'use client'
import { useState } from 'react'
import { Avatar } from 'flowbite-react'
import { Input } from '../../components/ui/input'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../../components/ui/pagination'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { GroupElementProps } from '../../lib/types/entity'
import { Button } from '../../components/ui/button'
import { createGroup } from '../../api/group/group'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { groupCreateSchema } from '../../lib/validation'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'

const GroupElement = ({ groupId, name, description, numberOfMembers, avatar }: GroupElementProps) => {
  return (
    <Link to={`/group-management/${groupId}`} className='w-full'>
      <Card className='px-4 py-8 bg-pink-200 flex flex-col justify-start items-center hover:shadow-xl hover:bg-pink-300 cursor-pointer min-w-[300px]'>
        <div className=' flex flex-col justify-start items-center space-y-4 '>
          <div className='flex justify-center items-center space-x-4'>
            <Avatar alt={`${name} avatar`} img={avatar} />
            <p className='font-bold text-2xl text-blue-500'>{name}</p>
          </div>
          <p className='italic text-lg'>{description}</p>
          <p>{numberOfMembers} members</p>
        </div>
      </Card>
    </Link>
  )
}

const GROUP_PER_PAGE = 8

const GroupManagementPage = () => {
  const group = useSelector((state: RootState) => state.group.groups)
  const [groups, setGroups] = useState(group)
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const indexOfLastGroup = currentPage * GROUP_PER_PAGE
  const indexOfFirstGroup = indexOfLastGroup - GROUP_PER_PAGE
  const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup)

  const totalPages = Math.ceil(filteredGroups.length / GROUP_PER_PAGE)

  const form = useForm<z.infer<typeof groupCreateSchema>>({
    resolver: zodResolver(groupCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      avatar: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof groupCreateSchema>) => {
    try {
      setIsSubmitting(true)
      // upload image to cdn to get url => create group
      await createGroup(data)
        .then((res) => {
          setGroups((prev) => [...prev, res])
        })
        .finally(() => {
          setIsOpen(false)
          setIsSubmitting(false)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-full p-10 flex flex-col justify-start items-start space-y-8'>
      <div className='flex w-full justify-between items-end'>
        <div className='border-b-[3px] pb-1 pr-4 border-b-cyan-400'>
          <p className='text-3xl font-bold'>Nhóm của tôi</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Create new group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new group</DialogTitle>
              <DialogDescription>Fill in the form below to create a new group.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='avatar'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar (optional)</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='w-full flex justify-end items-center space-x-4 pt-4'>
                  {!isSubmitting && (
                    <Button
                      variant='outline'
                      onClick={(e) => {
                        e.preventDefault()
                        setIsOpen(false)
                      }}
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    variant='default'
                    disabled={isSubmitting}
                    type='submit'
                    className={`${isSubmitting ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-500' : ''}`}
                  >
                    {isSubmitting ? (
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900'></div>
                    ) : (
                      'Create'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        type='text'
        placeholder='Tìm kiếm nhóm'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full'
      />

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
        {currentGroups.map((group, index) => (
          <GroupElement
            key={index}
            groupId={group.id}
            name={group.name}
            description={group.description}
            numberOfMembers={group.numMember}
            /* avatar={group.avatar} */
          />
        ))}
      </div>
      <Pagination className='mt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(index + 1)
                }}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default GroupManagementPage
