import { appLink } from '@/config/links';
import { DashboardIcon } from '@radix-ui/react-icons';
import {
  Home,
  LineChart,
  Package2,
  Settings,
  Users2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const Sidebar = () => {
  return (
    <aside className='inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 py-4'>
        <Link
          to={appLink.dashboard.href}
          className='flex items-center justify-center gap-2 text-lg font-semibold rounded-full group h-9 w-9 shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <Package2 className='w-4 h-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/dashboard'
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8'
              >
                <Home className='w-5 h-5' />
                <span className='sr-only'>
                  {appLink.dashboard.label}
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>
              {appLink.dashboard.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={appLink.members.href}
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 hover:text-foreground md:h-8 md:w-8'
              >
                <Users2 className='w-5 h-5' />
                <span className='sr-only'>Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>
              {appLink.members.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={appLink.programs.href}
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 bg-accent text-accent-foreground hover:text-foreground md:h-8 md:w-8'
              >
                <DashboardIcon className='w-5 h-5' />
                <span className='sr-only'>Programs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>
              {' '}
              {appLink.programs.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={appLink.members.href}
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8'
              >
                <Users2 className='w-5 h-5' />
                <span className='sr-only'>
                  {appLink.members.label}
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>
              {appLink.members.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/analytics'
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8'
              >
                <LineChart className='w-5 h-5' />
                <span className='sr-only'>Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className='flex flex-col items-center gap-4 px-2 py-4 mt-auto'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/settings'
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8'
              >
                <Settings className='w-5 h-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
