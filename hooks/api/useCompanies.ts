import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Company, CompanyCreate, CompanyUpdate } from '@/types/api';

const COMPANIES_KEY = 'companies';

// Get all companies
export const useCompanies = () => {
  return useQuery({
    queryKey: [COMPANIES_KEY],
    queryFn: async (): Promise<Company[]> => {
      const { data } = await api.get('/api/v1/companies');
      return data;
    },
  });
};

// Get single company
export const useCompany = (companyId: number) => {
  return useQuery({
    queryKey: [COMPANIES_KEY, companyId],
    queryFn: async (): Promise<Company> => {
      const { data } = await api.get(`/api/v1/companies/${companyId}`);
      return data;
    },
    enabled: !!companyId,
  });
};

// Create company
export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (companyData: CompanyCreate): Promise<Company> => {
      const { data } = await api.post('/api/v1/companies', companyData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_KEY] });
    },
  });
};

// Update company
export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...companyData }: CompanyUpdate & { id: number }): Promise<Company> => {
      const { data } = await api.patch(`/api/v1/companies/${id}`, companyData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_KEY] });
      queryClient.setQueryData([COMPANIES_KEY, data.id], data);
    },
  });
};

// Delete company
export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (companyId: number): Promise<void> => {
      await api.delete(`/api/v1/companies/${companyId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_KEY] });
    },
  });
};