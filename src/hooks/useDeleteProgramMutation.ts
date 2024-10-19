import { useMutation } from '@tanstack/react-query';
import { deleteProgram } from '@/services/program';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/config/queryClient';
import { useNavigate } from 'react-router-dom';

export const useDeleteProgramMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        variant: 'destructive',
        title: data.message,
        description: `Program with ID ${variables} has been deleted.`,
      });
      navigate('/programs');
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error?.message || 'Failed to delete the program.',
      });
    },
  });

  // Return mutate function and isLoading from the mutation object
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending, // Now this is exported
  };
};
