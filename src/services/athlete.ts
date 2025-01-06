import { apiClient } from "@/config/axios.config";
import { Athlete, AthleteResponse } from "@/types";
import { EndpointType } from "@/types/api";

export const fetchAthleteBySearch = async (
  searchQuery: string,
  currentPage: number,
  rowsPerPage: number
): Promise<{
  data: Athlete[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}> => {
  const response = await apiClient.get<AthleteResponse>(
    `${EndpointType.Athlete}/search`,
    {
      params: { name: searchQuery, page: currentPage, limit: rowsPerPage },
    }
  );
  return response.data;
};
