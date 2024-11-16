import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/config/axios.config";
import { EndpointType } from "@/types/api";

interface CheckInResponse {
  success: boolean;
  message: string;
}

interface CheckInError {
  error: string;
}

export const useCheckIn = () => {
  const { toast } = useToast();

  const mutation = useMutation<
    CheckInResponse,
    AxiosError<CheckInError>,
    string
  >({
    mutationFn: async (enrollmentId: string) => {
      const response = await apiClient.post(
        `${EndpointType.Attendance}/${enrollmentId}/check-in`
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Check-In Successful",
        description: data.message,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Check-In Failed",
        description:
          error.response?.data.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
