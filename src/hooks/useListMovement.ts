import { apiClient } from "@/config/axios.config";
import { ClientError, MovementResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Fetcher function to call the API endpoint
const fetchMovements = async (): Promise<MovementResponse> => {
  const response = await apiClient.get("/movement/list");
  return response.data;
};

export const useListMovement = () => {
  const {
    data: movements,
    error,
    isLoading,
    isError,
  } = useQuery<MovementResponse, AxiosError<ClientError>>({
    queryKey: ["movements"],
    queryFn: fetchMovements,
  });

  return {
    movements,
    isLoading,
    isError,
    error,
  };
};
