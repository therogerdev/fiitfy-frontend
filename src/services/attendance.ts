import { apiClient } from "@/config/axios.config";
import { EndpointType } from "@/types/api";

export const checkInToClassSubmit = async (enrollmentId: string) => {
  const checkIn = await apiClient.post(
    `${EndpointType.Attendance}/${enrollmentId}/check-in`
  );

  return checkIn;
};
