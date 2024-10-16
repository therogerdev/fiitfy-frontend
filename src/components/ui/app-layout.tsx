import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from '@/components/ui/button';
import { Toaster } from '@components/ui/toaster';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
      <main className='flex w-screen h-screen'>
        <Sidebar />
        <div className='relative flex flex-col flex-grow h-full bg-white content'>
          <header className='border-b'>
            <div className='flex items-center h-16 px-4'>
              <TeamSwitcher />
              <Navbar />
              <div className='flex items-center ml-auto space-x-4'>
                <Search />
                <UserNav />
              </div>
            </div>
          </header>
          <div className='flex-grow w-full h-full bg-slate-100'>
            {children}
          </div>
        </div>
        <Toaster />
      </main>
    );
  }

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className='flex items-center gap-4 mx-6 text-sm lg:gap-6'>
      <Link
        to='/dashboard'
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith('/dashboard')
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        Dashboard
      </Link>
      <Link
        to='/member'
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith('/member')
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        Members
      </Link>
      <Link
        to='/classes'
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith('/classes')
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        Classes
      </Link>
      <Link
        to='/programs'
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname.startsWith('/program')
            ? 'text-foreground'
            : 'text-foreground/60'
        )}
      >
        Programs
      </Link>
    </nav>
  );
};

const Sidebar = () => {
  return (
    <aside className='inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 py-4'>
        <Link
          to='/'
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
                <span className='sr-only'>Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/orders'
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 hover:text-foreground md:h-8 md:w-8'
              >
                <ShoppingCart className='w-5 h-5' />
                <span className='sr-only'>Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Orders</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/programs'
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 bg-accent text-accent-foreground hover:text-foreground md:h-8 md:w-8'
              >
                <Package className='w-5 h-5' />
                <span className='sr-only'>Programs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Programs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/customers'
                className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8'
              >
                <Users2 className='w-5 h-5' />
                <span className='sr-only'>Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Customers</TooltipContent>
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

export function Search() {
  return (
    <div>
      <Input
        type='search'
        placeholder='Search...'
        className='md:w-[100px] lg:w-[300px]'
      />
    </div>
  );
}

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative w-8 h-8 rounded-full'
        >
          <Avatar className='w-8 h-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>shadcn</p>
            <p className='text-xs leading-none text-muted-foreground'>
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ui/command';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const groups = [
  {
    label: 'Personal Account',
    teams: [
      {
        label: 'Hybrid Theory HQ',
        value: 'personal',
      },
    ],
  },
  {
    label: 'Teams',
    teams: [
      {
        label: 'Acme Inc.',
        value: 'acme-inc',
      },
      {
        label: 'Monsters Inc.',
        value: 'monsters',
      },
    ],
  },
];

type Team = (typeof groups)[number]['teams'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type TeamSwitcherProps = PopoverTriggerProps;

function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] =
    React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    groups[0].teams[0]
  );

  return (
    <Dialog
      open={showNewTeamDialog}
      onOpenChange={setShowNewTeamDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a team'
            className={cn('w-[200px] justify-between', className)}
          >
            <Avatar className='w-5 h-5 mr-2'>
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                alt={selectedTeam.label}
                className='grayscale'
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <CaretSortIcon className='w-4 h-4 ml-auto opacity-50 shrink-0' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search team...' />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                      }}
                      className='text-sm'
                    >
                      <Avatar className='w-5 h-5 mr-2'>
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                          className='grayscale'
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedTeam.value === team.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className='w-5 h-5 mr-2' />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className='py-2 pb-4 space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Team name</Label>
              <Input id='name' placeholder='Acme Inc.' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='plan'>Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Select a plan' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='free'>
                    <span className='font-medium'>Free</span> -{' '}
                    <span className='text-muted-foreground'>
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value='pro'>
                    <span className='font-medium'>Pro</span> -{' '}
                    <span className='text-muted-foreground'>
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setShowNewTeamDialog(false)}
          >
            Cancel
          </Button>
          <Button type='submit'>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
