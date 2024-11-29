import { apiClient } from "@/config/axios.config";
import { WorkoutResponsePagination } from "@/types";
import { EndpointType } from "@/types/api";

// Fetch Workouts function
export const fetchWorkouts = async (): Promise<WorkoutResponsePagination> => {
  const response = await apiClient.get(`${EndpointType.Workout}/list`);
  return response.data;
};
