"use client"
import { Button } from '@/components/ui/button';
import { File, ListFilter, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';


const ProgramActions = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-2 ml-auto'>
      <FilterMenu />
      <Button size='sm' variant='outline' className='gap-1 h-7'>
        <File className='h-3.5 w-3.5' />
        <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
          Export
        </span>
      </Button>
      <Button
        onClick={() => navigate('/program/add')}
        size='sm'
        className='gap-1 h-7'
      >
        <PlusCircle className='h-3.5 w-3.5' />
        <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
          Add Program
        </span>
      </Button>
    </div>
  );
};

export default ProgramActions;

const FilterMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 h-7">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
