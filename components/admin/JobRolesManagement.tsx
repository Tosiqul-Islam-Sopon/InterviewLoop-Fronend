'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useJobRoles, useCreateJobRole, useUpdateJobRole, useDeleteJobRole } from '@/hooks/api/useJobRoles';
import { JobRole, JobRoleCreate, JobRoleUpdate } from '@/types/api';

export function JobRolesManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingJobRole, setEditingJobRole] = useState<JobRole | null>(null);
  
  const { data: jobRoles, isLoading } = useJobRoles();
  const createJobRole = useCreateJobRole();
  const updateJobRole = useUpdateJobRole();
  const deleteJobRole = useDeleteJobRole();

  const handleCreate = async (data: JobRoleCreate) => {
    await createJobRole.mutateAsync(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = async (data: JobRoleUpdate & { id: number }) => {
    await updateJobRole.mutateAsync(data);
    setEditingJobRole(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this job role?')) {
      await deleteJobRole.mutateAsync(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Roles</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Job Role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Job Role</DialogTitle>
            </DialogHeader>
            <JobRoleForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobRoles?.map((jobRole) => (
            <TableRow key={jobRole.id}>
              <TableCell>{jobRole.id}</TableCell>
              <TableCell>{jobRole.title}</TableCell>
              <TableCell>{jobRole.level || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingJobRole(jobRole)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(jobRole.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingJobRole} onOpenChange={() => setEditingJobRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job Role</DialogTitle>
          </DialogHeader>
          {editingJobRole && (
            <JobRoleForm 
              jobRole={editingJobRole} 
              onSubmit={(data) => handleUpdate({ ...data, id: editingJobRole.id })} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function JobRoleForm({ jobRole, onSubmit }: { jobRole?: JobRole; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: jobRole?.title || '',
    level: jobRole?.level || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      level: formData.level || undefined,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="level">Level</Label>
        <Input
          id="level"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          placeholder="e.g., Junior, Senior, Lead"
        />
      </div>
      <Button type="submit" className="w-full">
        {jobRole ? 'Update' : 'Create'} Job Role
      </Button>
    </form>
  );
}