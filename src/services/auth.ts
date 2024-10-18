import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';

// User login
export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post(EndpointType.Login, {
    email,
    password,
  });
  return response.data;
};

// User signup
export const signupUser = async (email: string, password: string) => {
  const response = await apiClient.post(EndpointType.Signup, {
    email,
    password,
  });
  return response.data;
};

// Get user details
export const getUserDetail = async (token: string) => {
  const response = await apiClient.get(EndpointType.Me, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const logoutRequest = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await apiClient.post(EndpointType.Logout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem('token');

    return response.data
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Failed to logout. Please try again');
  }
};
