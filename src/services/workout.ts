import { apiClient } from "@/config/axios.config";
import { Workout, WorkoutResponse, WorkoutResponsePagination } from "@/types";
import { EndpointType } from "@/types/api";

export const fetchWorkouts = async (): Promise<WorkoutResponsePagination> => {
  const response = await apiClient.get(`${EndpointType.Workout}/list`);
  return response.data;
};

export const createWorkout = async (
  data: Workout
): Promise<WorkoutResponse> => {
  const response = await apiClient.post(`${EndpointType.Workout}/create`, data);
  return response.data;
};
