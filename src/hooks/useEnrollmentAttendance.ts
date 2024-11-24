import { apiClient } from "@/config/axios.config";
import { queryClient } from "@/config/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  AttendanceStatus,
  ClassEnrollmentAttendanceResponse,
  ClientError,
} from "@/types";
import { EndpointType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useEnrollmentAttendance = () => {
  const { toast } = useToast();

  const mutation = useMutation<
    ClassEnrollmentAttendanceResponse,
    AxiosError<ClientError>,
    { enrollmentId: string; status: AttendanceStatus } // Define the mutation's input type
  >({
    mutationFn: async ({ enrollmentId, status }) => {
      const response = await apiClient.post<ClassEnrollmentAttendanceResponse>(
        `${EndpointType.Attendance}/${enrollmentId}/status`,
        { status }
      );

      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate relevant queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      toast({
        title: `Enrollment update: ${data.data.attendanceStatus}`,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Updating Status",
        description:
          error.response?.data?.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
