import { apiClient } from "@/config/axios.config";
import { ClassResponse } from "@/types";
import { EndpointType } from "@/types/api";

export const fetchClassesBySelectedDate = async (
  startDate: string,
  endDate: string
): Promise<ClassResponse> => {
  const response = await apiClient.get(
    `${EndpointType.Class}/list?startTime=${startDate}&endTime=${endDate}`
  );
  return response.data;
};



export const fetchClassDetail = async (id: string) => {
  const response = await apiClient.get(`${EndpointType.Class}/${id}`);

  return response.data;
};