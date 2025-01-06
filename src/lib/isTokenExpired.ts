import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const { exp }: TokenPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return exp < currentTime; // Token has expired if current time > expiration time
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
