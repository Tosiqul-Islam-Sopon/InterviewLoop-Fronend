import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { InterviewType, InterviewTypeCreate, InterviewTypeUpdate } from '@/types/api';

const INTERVIEW_TYPES_KEY = 'interview-types';

// Get all interview types
export const useInterviewTypes = () => {
  return useQuery({
    queryKey: [INTERVIEW_TYPES_KEY],
    queryFn: async (): Promise<InterviewType[]> => {
      const { data } = await api.get('/api/v1/interview-types');
      return data;
    },
  });
};

// Get single interview type
export const useInterviewType = (interviewTypeId: number) => {
  return useQuery({
    queryKey: [INTERVIEW_TYPES_KEY, interviewTypeId],
    queryFn: async (): Promise<InterviewType> => {
      const { data } = await api.get(`/api/v1/interview-types/${interviewTypeId}`);
      return data;
    },
    enabled: !!interviewTypeId,
  });
};

// Create interview type
export const useCreateInterviewType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (interviewTypeData: InterviewTypeCreate): Promise<InterviewType> => {
      const { data } = await api.post('/api/v1/interview-types', interviewTypeData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERVIEW_TYPES_KEY] });
    },
  });
};

// Update interview type
export const useUpdateInterviewType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...interviewTypeData }: InterviewTypeUpdate & { id: number }): Promise<InterviewType> => {
      const { data } = await api.put(`/api/v1/interview-types/${id}`, interviewTypeData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [INTERVIEW_TYPES_KEY] });
      queryClient.setQueryData([INTERVIEW_TYPES_KEY, data.id], data);
    },
  });
};

// Delete interview type
export const useDeleteInterviewType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (interviewTypeId: number): Promise<void> => {
      await api.delete(`/api/v1/interview-types/${interviewTypeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERVIEW_TYPES_KEY] });
    },
  });
};