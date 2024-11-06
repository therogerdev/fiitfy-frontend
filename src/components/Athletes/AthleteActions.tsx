import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ListFilter,
  PlusCircle,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface AthleteActionsProps {
  onFilter: (searchQuery: string) => void;
  onAdd: () => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  totalAthletes: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const AthleteActions: React.FC<AthleteActionsProps> = ({
  onFilter,
  onAdd,
  rowsPerPage,
  setRowsPerPage,
  totalAthletes,
  currentPage,
  onPageChange,
}) => {
  // Calculate pagination range
  const totalPages = Math.ceil(totalAthletes / rowsPerPage);
  const startRange = currentPage * rowsPerPage + 1;
  const endRange = Math.min(
    (currentPage + 1) * rowsPerPage,
    totalAthletes
  );

  return (
    <div className='flex items-center justify-between mb-4 space-x-4'>
      {/* Filter Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='h-8 gap-1'>
            <ListFilter className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Filter
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            Active
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Archived
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add Athlete Button */}
      <Button size={'sm'} onClick={onAdd} className='flex-shrink-0'>
        <PlusCircle className=' w-3.5 h-3.5 mr-1' />
        Add Athlete
      </Button>

      {/* Rows per page Select */}
      <Select
        value={String(rowsPerPage)}
        onValueChange={(value) => setRowsPerPage(Number(value))}
      >
        <SelectTrigger className='w-20'>
          <SelectValue placeholder='Rows' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
          <SelectItem value='50'>50</SelectItem>
        </SelectContent>
      </Select>

      {/* Pagination Info */}
      <div className='text-gray-500'>
        {`${startRange}-${endRange} of ${totalAthletes}`}
      </div>

      {/* Pagination Controls */}
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='hidden w-8 h-8 p-0 lg:flex'
        >
          <span className='sr-only'>Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button variant='outline' className='w-8 h-8 p-0'>
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button variant='outline' className='w-8 h-8 p-0'>
          <span className='sr-only'>Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant='outline'
          className='hidden w-8 h-8 p-0 lg:flex'
        >
          <span className='sr-only'>Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
};

export default AthleteActions;
