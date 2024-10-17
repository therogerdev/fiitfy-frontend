import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';

// User login
export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post(EndpointType.Login, { email, password });
  return response.data;
};

// User signup
export const signupUser = async (email: string, password: string) => {
  const response = await apiClient.post(EndpointType.Signup, { email, password });
  return response.data;
};

// Get user details
export const getUserDetail = async () => {
  const response = await apiClient.get(EndpointType.Me);
  return response.data;
};

// User logout
export const logoutUser = async () => {
  const response = await apiClient.post(EndpointType.Logout);
  return response.data;
};
