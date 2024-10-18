import { getUserDetail } from '@/services/auth';
import { userAtom } from '@/store/user';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ['/login', '/recover-password'];

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
