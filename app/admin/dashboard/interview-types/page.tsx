'use client'

import { NextPage } from 'next'

import { Edit, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useCreateInterviewType,
  useDeleteInterviewType,
  useInterviewTypes,
  useUpdateInterviewType,
} from '@/hooks/api'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  InterviewType,
  InterviewTypeCreate,
  InterviewTypeUpdate,
} from '@/types/api'

const InterviewTypesPage: NextPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingInterviewType, setEditingInterviewType] =
    useState<InterviewType | null>(null)

  const { data: interviewTypes, isLoading } = useInterviewTypes()
  const createInterviewType = useCreateInterviewType()
  const updateInterviewType = useUpdateInterviewType()
  const deleteInterviewType = useDeleteInterviewType()

  const handleCreate = async (data: InterviewTypeCreate) => {
    await createInterviewType.mutateAsync(data)
    setIsCreateOpen(false)
  }

  const handleUpdate = async (data: InterviewTypeUpdate & { id: number }) => {
    await updateInterviewType.mutateAsync(data)
    setEditingInterviewType(null)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this interview type?')) {
      await deleteInterviewType.mutateAsync(id)
    }
  }

  if (isLoading) return <div>Loading...</div>
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Interview Types</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Interview Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Interview Type</DialogTitle>
            </DialogHeader>
            <InterviewTypeForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviewTypes?.map((interviewType) => (
            <TableRow key={interviewType.id}>
              <TableCell>{interviewType.id}</TableCell>
              <TableCell>{interviewType.name}</TableCell>
              <TableCell>{interviewType.description || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingInterviewType(interviewType)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(interviewType.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={!!editingInterviewType}
        onOpenChange={() => setEditingInterviewType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Interview Type</DialogTitle>
          </DialogHeader>
          {editingInterviewType && (
            <InterviewTypeForm
              interviewType={editingInterviewType}
              onSubmit={(data) =>
                handleUpdate({ ...data, id: editingInterviewType.id })
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InterviewTypesPage

function InterviewTypeForm({
  interviewType,
  onSubmit,
}: {
  interviewType?: InterviewType
  onSubmit: (data: InterviewTypeCreate) => void
}) {
  const [formData, setFormData] = useState({
    name: interviewType?.name || '',
    description: interviewType?.description || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      description: formData.description || undefined,
    }
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Optional description"
        />
      </div>
      <Button type="submit" className="w-full">
        {interviewType ? 'Update' : 'Create'} Interview Type
      </Button>
    </form>
  )
}
