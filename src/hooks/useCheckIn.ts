import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/config/axios.config";
import { EndpointType } from "@/types/api";
import { ClassEnrollment, ClientError } from "@/types";
import { queryClient } from "@/config/queryClient";

export const useCheckIn = () => {
  const { toast } = useToast();

  const mutation = useMutation<
    ClassEnrollment,
    AxiosError<ClientError>,
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
        description: `${data.athlete.firstName} check-in successful!`,
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["enrollment"],
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

  const isPending = mutation.isPending || mutation.isError;

  return { ...mutation, isPending };
};
