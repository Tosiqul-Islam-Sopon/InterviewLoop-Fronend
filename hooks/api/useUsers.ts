import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { User, UserCreate, UserUpdate } from '@/types/api';

const USERS_KEY = 'users';

// Get all users
export const useUsers = (skip = 0, limit = 100) => {
  return useQuery({
    queryKey: [USERS_KEY, { skip, limit }],
    queryFn: async (): Promise<User[]> => {
      const { data } = await api.get(`/users?skip=${skip}&limit=${limit}`);
      return data;
    },
  });
};

// Get single user
export const useUser = (userId: number) => {
  return useQuery({
    queryKey: [USERS_KEY, userId],
    queryFn: async (): Promise<User> => {
      const { data } = await api.get(`/users/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
};

// Create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: UserCreate): Promise<User> => {
      const { data } = await api.post('/users', userData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...userData }: UserUpdate & { id: number }): Promise<User> => {
      const { data } = await api.put(`/users/${id}`, userData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      queryClient.setQueryData([USERS_KEY, data.id], data);
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: number): Promise<void> => {
      await api.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
  });
};