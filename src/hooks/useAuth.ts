import { getUserDetail } from '@/services/auth';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userDetails = await getUserDetail(token);
          setUser(userDetails);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [navigate]);

  return { user, loading };
};
