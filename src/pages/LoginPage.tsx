import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getUserDetail, loginUser } from '@/services/auth';
import { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null); // State to hold user data
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/dashboard';

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserDetails = async () => {
        const userDetails = await getUserDetail(token); // Assume getUserDetail fetches user data
        setUser(userDetails);
      };
      fetchUserDetails();
    }
  }, []);

  const { mutate } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await loginUser(email, password);
      return response;
    },
    onSuccess: (response) => {
      localStorage.setItem('token', response.token);
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
      });
      navigate(from);
    },
    onError: (error: Error) => {
      setLoginError(`${error.message}`);
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setUser(null); // Clear the user state
    navigate('/login'); // Navigate to login page
  };

  return (
    <AuthLayout user={user}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {user ? `Logged as: ${user.username}` : 'Login'}
          </CardTitle>
          {user && (
            <div className='flex mt-2'>
              <p className='mx-2 text-sm'>Not you?</p>
              <Link
                to='#'
                onClick={handleLogout}
                className='text-sm text-blue-500 underline'
              >
                Logout
              </Link>
            </div>
          )}
          {user ? (
            <CardDescription>
              If it's not you log out then enter your credentials
            </CardDescription>
          ) : (
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {!user ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='grid gap-4'
            >
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className='text-red-600'>
                    Email is required
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <Link
                    to='/recover-password'
                    className='inline-block ml-auto text-sm underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: true })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute transform -translate-y-1/2 right-2 top-1/2'
                  >
                    {showPassword ? (
                      <EyeOff className='w-4 h-4' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className='text-red-600'>
                    Password is required
                  </span>
                )}
              </div>
              {loginError && (
                <span className='text-red-600'>{loginError}</span>
              )}
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </form>
          ) : (
            <div className='mt-4 text-sm text-center'>
              You are logged in as{' '}
              {`${user.athlete?.firstName} ${user.athlete?.lastName}`}
            </div>
          )}
          {!user && (
            <div className='mt-4 text-sm text-center'>
              Don&apos;t have an account?{' '}
              <Link to='#' className='underline'>
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
