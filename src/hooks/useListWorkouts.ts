import { fetchWorkouts } from "@/services/workout";
import { ClientError, WorkoutResponsePagination } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useWorkoutList = () => {
  const { data, error, isLoading } = useQuery<WorkoutResponsePagination, AxiosError<ClientError>>({
    queryKey: ["workouts"],
    queryFn: () => fetchWorkouts(),
    refetchOnWindowFocus: true,
  });

  return {
    workouts: data,
    error,
    isLoading,
    pagination: data?.pagination
  };
};