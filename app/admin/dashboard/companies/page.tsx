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
import { useCompanies } from '@/hooks/api'
import { useCreateCompany } from '@/hooks/api/useCompanies'
import { Company, CompanyCreate } from '@/types/api'
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const CompaniesPage: NextPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data: companies, isLoading } = useCompanies()
  const createCompany = useCreateCompany();

  const handleCreate = async (data: CompanyCreate) => {
      await createCompany.mutateAsync(data);
      setIsCreateOpen(false);
    };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Companies</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Company</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Company</DialogTitle>
            </DialogHeader>
            <CompanyForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.id}</TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.industry || '-'}</TableCell>
              <TableCell>{company.location || '-'}</TableCell>
              <TableCell>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>{company.is_active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={() => setEditingCompany(company)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    // onClick={() => handleDelete(company.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <Dialog open={!!editingCompany} onOpenChange={() => setEditingCompany(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
          </DialogHeader>
          {editingCompany && (
            <CompanyForm 
              company={editingCompany} 
              onSubmit={(data) => handleUpdate({ ...data, id: editingCompany.id })} 
            />
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  )
}

export default CompaniesPage

function CompanyForm({ company, onSubmit }: { company?: Company; onSubmit: (data: CompanyCreate) => void }) {
  const [formData, setFormData] = useState({
    name: company?.name || '',
    industry: company?.industry || '',
    location: company?.location || '',
    website: company?.website || '',
    logo_url: company?.logo_url || '',
    is_active: company?.is_active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      industry: formData.industry || undefined,
      location: formData.location || undefined,
      website: formData.website || undefined,
      logo_url: formData.logo_url || undefined,
    };
    onSubmit(submitData);
  };

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
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="logo_url">Logo URL</Label>
        <Input
          id="logo_url"
          type="url"
          value={formData.logo_url}
          onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
        />
      </div>
      {company && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>
      )}
      <Button type="submit" className="w-full">
        {company ? 'Update' : 'Create'} Company
      </Button>
    </form>
  );
}
