import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/config/axios.config";
import { queryClient } from "@/config/queryClient";
import { useToast } from "@/hooks/use-toast";
import { EndpointType } from "@/types/api";

interface CancelEnrollmentError {
  error: string;
}

/**
 * Custom hook to handle enrollment cancellation
 * @param classId - The ID of the class for context invalidation
 */


export const useCancelEnrollment = (classId: string) => {
  const { toast } = useToast();

  const mutation = useMutation<void, AxiosError<CancelEnrollmentError>, string>(
    {
      mutationFn: async (enrollmentId: string) => {
        await apiClient.patch(`${EndpointType.Enroll}/${enrollmentId}/cancel`, {
          classId,
        });
      },
      onSuccess: () => {
        toast({
          title: "Enrollment Cancelled",
          description: "The enrollment has been successfully canceled.",
          variant: "default",
        });

        queryClient.invalidateQueries({
          queryKey: ["enrollment"],
        });
        queryClient.invalidateQueries({
          queryKey: ["class-detail", classId],
        });
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.error || "An unexpected error occurred.";
        toast({
          title: "Error Cancelling Enrollment",
          description: errorMessage,
          variant: "destructive",
        });
      },
    }
  );

  return mutation;
};
