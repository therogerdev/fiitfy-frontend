import { apiClient } from "@/config/axios.config";
import { ClassResponse } from "@/types";

export const fetchClassesBySelectedDate = async (
  startDate: string,
  endDate: string
): Promise<ClassResponse> => {
  const response = await apiClient.get(
    `/class/list?startTime=${startDate}&endTime=${endDate}`
  );
  return response.data;
};
