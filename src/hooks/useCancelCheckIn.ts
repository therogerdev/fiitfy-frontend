import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/config/axios.config";
import { EndpointType } from "@/types/api";
import { queryClient } from "@/config/queryClient";

interface CancelCheckInResponse {
  success: boolean;
  message: string;
}

interface CancelCheckInError {
  error: string;
}

/**
 * Custom hook for canceling a check-in
 * @returns Mutation object with isPending, mutate, and error state
 */
export const useCancelCheckIn = () => {
  const { toast } = useToast();

  const mutation = useMutation<
    CancelCheckInResponse,
    AxiosError<CancelCheckInError>,
    string
  >({
    mutationFn: async (enrollmentId: string) => {
      const response = await apiClient.post(
        `${EndpointType.Attendance}/${enrollmentId}/check-in/cancel`
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Check-In Cancelled",
        description: data.message,
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["enrollment"],
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Cancel Check-In",
        description:
          error.response?.data.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  return {
    cancelCheckIn: mutation.mutate,
    cancelCheckInLoading: mutation.isPending,
    error: mutation.error,
  };
};
