import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { apiClient } from "@/config/axios.config";
import { EndpointType } from "@/types/api";
import {
  ClassEnrollment,
  ClassEnrollmentResponse,
  ClassEnrollmentStatus,
  ClientError,
} from "@/types";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

export const useEnrollAthlete = (classId: string) => {
  const { toast } = useToast();

  const enrollMutation = useMutation<
    ClassEnrollment[],
    AxiosError<ClientError>,
    string
  >({
    mutationFn: async (athleteId) => {
      const response = await apiClient.post<ClassEnrollmentResponse>(
        `${EndpointType.Enroll}/${classId}/enroll`,
        { athleteId }
      );
      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    },
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: ["enrollment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["class-detail", classId],
      });

      // Display toast messages
      data.forEach((enrollment) => {
        if (enrollment.status === ClassEnrollmentStatus.WAITLISTED) {
          toast({
            title: "WAITLIST!",
            description: `${enrollment.athlete.firstName} ${enrollment.athlete.lastName} has been added to the waitlist`,
            variant: "default",
          });
        } else {
          toast({
            title: "Enrolled!",
            description: `${enrollment.athlete.firstName} ${enrollment.athlete.lastName} has been enrolled successfully`,
            variant: "info",
          });
        }
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";

      toast({
        title: "Enrollment Error",
        description: errorMessage as string,
        variant: "destructive",
      });
    },
  });

  return {
    enrollMutation,
  };
};