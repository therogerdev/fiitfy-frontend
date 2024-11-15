import { getUserDetail } from '@/services/auth';
import { userAtom } from '@/store/user';
import { Role } from '@/types/user';
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
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [navigate, location.pathname, setUser]);

  // Authorization utility
  const isAuthorized = (requiredRoles: Role) => {
    if (!user || !user.role) return false;

    // If only one role is required, convert to array for consistent handling
    const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    return rolesArray.includes(user.role);
  };

  return { user, loading, isAuthorized };
};