import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { appLink } from '@/config/links';
import { loginUser } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff components

export default function Login() {
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
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/dashboard';

  // mutation
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

  return (
    <div className='overflow-hidden border shadow bg-background'>
      <div className='container relative flex-col items-center justify-center hidden h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <Link
          to={appLink.dashboard.href}
          className='absolute inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md right-4 top-4 md:right-8 md:top-8 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9'
        >
          {appLink.dashboard.label}
        </Link>
        <div className='relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-6 h-6 mr-2'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            FitFy App
          </div>
        </div>
        <Card className='max-w-sm mx-auto'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                    to='#'
                    className='inline-block ml-auto text-sm underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'} // Toggle input type
                    {...register('password', { required: true })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
                    className='absolute transform -translate-y-1/2 right-2 top-1/2'
                  >
                    {showPassword ? (
                      <EyeOff className='w-4 h-4' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}{' '}
                    {/* Toggle icon */}
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
              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </form>
            <div className='mt-4 text-sm text-center'>
              Don&apos;t have an account?{' '}
              <Link to='#' className='underline'>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
