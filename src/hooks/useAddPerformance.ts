import { apiClient } from "@/config/axios.config";
import { Performance, PerformanceResponse } from "@/types";
import { EndpointType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast"; 
import { queryClient } from "@/config/queryClient";

export const addPerformanceRequest = async (
  performanceData: Omit<Performance, "id" | "createdAt" | "updatedAt"> 
): Promise<PerformanceResponse> => {
  const response = await apiClient.post(`${EndpointType.Performance}/add`, performanceData);
  return response.data;
};

// Custom Hook
export const useAddPerformance = () => {
  const { toast } = useToast();

  const mutation = useMutation<
    PerformanceResponse, 
    Error, 
    Omit<Performance, "id" | "createdAt" | "updatedAt"> 
  >({
    mutationFn: addPerformanceRequest,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["performances"]})
      toast({
        title: "Performance Added",
        description: "The performance data has been successfully added.",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Adding Performance",
        description: error?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};