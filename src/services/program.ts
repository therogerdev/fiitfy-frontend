import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';

export const fetchAllPrograms = async () => {
  const response = await apiClient.get(EndpointType.AllProgram);
  return response.data;
};

export const fetchProgramDetail = async (slug: string) => {
  const response = await apiClient.get(
    `${EndpointType.Program}/${slug}`
  );
  return response.data;
};

export const deleteProgram = async (id: string) => {
  const response = await apiClient.delete(
    `${EndpointType.Program}/${id}`
  );
  return response.data;
};
