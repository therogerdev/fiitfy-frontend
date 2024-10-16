import { fetchAllPrograms } from '@/services/program';
import { ProgramsResponse } from '@/types/program';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/table';
import { MoreHorizontal } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../ui/spinner';

const ProgramsList = () => {
  const {
    data: programs,
    error,
    isLoading,
  } = useQuery<ProgramsResponse>({
    queryKey: ['programs'],
    queryFn: () => fetchAllPrograms(),
  });

  if (isLoading) return <Spinner size='md' containerHeight={400} />;
  if (error instanceof Error)
    return <div>Error: {error.message}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='hidden w-[100px] sm:table-cell'>
            <span className='sr-only'>Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className='hidden md:table-cell'>
            Total Classes
          </TableHead>
          <TableHead className='hidden md:table-cell'>
            Created at
          </TableHead>
          <TableHead>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {programs?.data.map((program) => (
          <Fragment key={program.id}>
            <TableRow>
              <TableCell className='hidden sm:table-cell'>
                <Link to={`/program/${program.attributes.slug}`}>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>HT</AvatarFallback>
                  </Avatar>
                </Link>
              </TableCell>
              <TableCell className='font-medium'>
                {program.attributes.name}
              </TableCell>
              <TableCell className=' max-w-[400px] truncate'>
                {program.attributes.description}
              </TableCell>
              <TableCell>
                <Badge variant='outline'>
                  {program.attributes.active ? 'Active' : 'Draft'}
                </Badge>
              </TableCell>
              <TableCell>
                {program.attributes.numWeeks} Weeks
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {program.attributes.totalClasses}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                2023-07-12 10:42 AM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-haspopup='true'
                      size='icon'
                      variant='ghost'
                    >
                      <MoreHorizontal className='w-4 h-4' />
                      <span className='sr-only'>Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProgramsList;
