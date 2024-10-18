// AuthLayout.tsx
import { appLink } from '@/config/links';
import { User } from '@/types/user';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  user?: User | null;

  children: ReactNode;
}

const AuthLayout = ({ user, children }: AuthLayoutProps) => {
  return (
    <div className='overflow-hidden border shadow bg-background'>
      <div className='container relative flex-col items-center justify-center hidden h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        {user && (
          <Link
            to={appLink.dashboard.href}
            className='absolute inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md right-4 top-4 md:right-8 md:top-8 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9'
          >
            {appLink.dashboard.label}
          </Link>
        )}
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
        <div className='max-w-sm mx-auto'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
