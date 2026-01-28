import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Tag, TagCreate, TagUpdate } from '@/types/api';

const TAGS_KEY = 'tags';

// Get all tags
export const useTags = () => {
  return useQuery({
    queryKey: [TAGS_KEY],
    queryFn: async (): Promise<Tag[]> => {
      const { data } = await api.get('/tags');
      return data;
    },
  });
};

// Get single tag
export const useTag = (tagId: number) => {
  return useQuery({
    queryKey: [TAGS_KEY, tagId],
    queryFn: async (): Promise<Tag> => {
      const { data } = await api.get(`/tags/${tagId}`);
      return data;
    },
    enabled: !!tagId,
  });
};

// Create tag
export const useCreateTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tagData: TagCreate): Promise<Tag> => {
      const { data } = await api.post('/tags', tagData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS_KEY] });
    },
  });
};

// Update tag
export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...tagData }: TagUpdate & { id: number }): Promise<Tag> => {
      const { data } = await api.put(`/tags/${id}`, tagData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TAGS_KEY] });
      queryClient.setQueryData([TAGS_KEY, data.id], data);
    },
  });
};

// Delete tag
export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tagId: number): Promise<void> => {
      await api.delete(`/tags/${tagId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS_KEY] });
    },
  });
};