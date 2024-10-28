import { appLink } from '@/config/links';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className='flex items-center gap-4 mx-6 text-sm lg:gap-6'>
      <Link
        to={appLink.dashboard.href}
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith(appLink.dashboard.href)
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        {appLink.dashboard.label}
      </Link>
      <Link
        to={appLink.athlete("id").href}
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith(appLink.athlete("id").href)
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        {appLink.athlete("id").label}
      </Link>
      <Link
        to={appLink.classes.href}
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith(appLink.classes.href)
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        {appLink.classes.label}
      </Link>
      <Link
        to={appLink.programs.href}
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith(appLink.programs.href)
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        {appLink.programs.label}
      </Link>
    </nav>
  );
};

export default Navbar;
