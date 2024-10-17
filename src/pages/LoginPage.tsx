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

export default function Login() {
  return (
    <div className='overflow-hidden border shadow bg-background'>
      <div className='container relative flex-col items-center justify-center hidden h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <Link
          to={appLink.dashboard.href} // Use the appLink for navigation
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
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
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
                <Input id='password' type='password' required />
              </div>
              <Button type='submit' className='w-full'>
                Login
              </Button>
              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </div>
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
