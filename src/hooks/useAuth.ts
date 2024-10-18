import { getUserDetail } from '@/services/auth';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const publicRoutes = ['/login', '/recover-password']; // Move it here

    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const userDetails = await getUserDetail(token);
          setUser(userDetails);
        } else if (!publicRoutes.includes(location.pathname)) {
          // Only navigate to /login if not on a public route
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Redirect only if not on a public route
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [navigate, location.pathname]); // Remove publicRoutes from dependencies

  return { user, loading };
};
