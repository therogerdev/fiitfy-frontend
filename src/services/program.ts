import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';
import { Program } from '@/types/program';

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

export const createProgram = async (data: Program) => {
  const response = await apiClient.post(EndpointType.CreateProgram, data);
  return response.data;
};
