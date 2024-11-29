import { useToast } from "@/hooks/use-toast";
import { createWorkout } from "@/services/workout";
import { ClientError, Workout, WorkoutResponse } from "@/types";
import { EndpointType } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation<WorkoutResponse, AxiosError<ClientError>, Workout>({
    mutationFn: (data: Workout) => createWorkout(data),
    onSuccess: (newWorkout) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      

      toast({
        title: "Workout Created",
        description: `Workout "${newWorkout.data.title}" was created successfully.`,
        variant: "default",
      });

      navigate(`/${EndpointType.Workout}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create workout.",
        variant: "destructive",
      });
    },
  });

  return {
    createWorkout: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};