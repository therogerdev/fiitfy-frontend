import { apiClient } from "@/config/axios.config";
import { queryClient } from "@/config/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ClassEnrollment, ClientError } from "@/types";
import { EndpointType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
    onSuccess: () => {
      toast({
        title: "Check-In Successful",
        description: `You are in! Have fun and sweat!`,
        variant: "success",
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
