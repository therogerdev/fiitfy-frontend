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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
export default function ForgotPassword() {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const [requestSuccess] = useState(false);

  //  TODO: implement OnSubmit function

  return (
    <AuthLayout>
      <Card className='max-w-sm mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl'>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to receive a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requestSuccess ? (
            <div className='mt-4 text-sm text-center'>
              Check your email for instructions to reset your
              password.
            </div>
          ) : (
            <form className='grid gap-4'>
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
              <Button type='submit' className='w-full'>
                Send Reset Link
              </Button>
            </form>
          )}
          <div className='mt-4 text-sm text-center'>
            Remembered your password?{' '}
            <Link to='/login' className='underline'>
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
