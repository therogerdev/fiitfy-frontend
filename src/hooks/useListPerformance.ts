import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/config/axios.config";
import { PerformanceResponse } from "@/types";
import { EndpointType } from "@/types/api";

// API Request Function
export const fetchPerformance = async (
  currentPage: number = 1,
  rowsPerPage: number = 10,
  filters?: {
    athleteId?: string;
    movementId?: string;
    workoutId?: string;
    classId?: string;
  }
): Promise<PerformanceResponse> => {
  const params = {
    page: currentPage,
    limit: rowsPerPage,
    ...filters,
  };

  const response = await apiClient.get<PerformanceResponse>(
    `${EndpointType.Performance}/list`,
    { params }
  );
  return response.data;
};

// Custom Hook
export const useListPerformance = (
  currentPage: number = 1,
  rowsPerPage: number = 10,
  filters?: {
    athleteId?: string;
    movementId?: string;
    workoutId?: string;
    classId?: string;
  }
) => {
  const queryKey = ["performances", currentPage, rowsPerPage, filters];
  const data = useQuery({
    queryKey,
    queryFn: () => fetchPerformance(currentPage, rowsPerPage, filters),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });

  return {
    performanceList: data.data?.data,
    isLoading: data.isLoading,
    error: data.error,
    refetch: data.refetch,
    pagination: data.data?.pagination,
  };
};