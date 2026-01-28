import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { JobRole, JobRoleCreate, JobRoleUpdate } from '@/types/api';

const JOB_ROLES_KEY = 'job-roles';

// Get all job roles
export const useJobRoles = (skip = 0, limit = 100) => {
  return useQuery({
    queryKey: [JOB_ROLES_KEY, { skip, limit }],
    queryFn: async (): Promise<JobRole[]> => {
      const { data } = await api.get(`/job-roles?skip=${skip}&limit=${limit}`);
      return data;
    },
  });
};

// Get single job role
export const useJobRole = (jobRoleId: number) => {
  return useQuery({
    queryKey: [JOB_ROLES_KEY, jobRoleId],
    queryFn: async (): Promise<JobRole> => {
      const { data } = await api.get(`/job-roles/${jobRoleId}`);
      return data;
    },
    enabled: !!jobRoleId,
  });
};

// Create job role
export const useCreateJobRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobRoleData: JobRoleCreate): Promise<JobRole> => {
      const { data } = await api.post('/job-roles', jobRoleData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOB_ROLES_KEY] });
    },
  });
};

// Update job role
export const useUpdateJobRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...jobRoleData }: JobRoleUpdate & { id: number }): Promise<JobRole> => {
      const { data } = await api.put(`/job-roles/${id}`, jobRoleData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [JOB_ROLES_KEY] });
      queryClient.setQueryData([JOB_ROLES_KEY, data.id], data);
    },
  });
};

// Delete job role
export const useDeleteJobRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobRoleId: number): Promise<void> => {
      await api.delete(`/job-roles/${jobRoleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOB_ROLES_KEY] });
    },
  });
};