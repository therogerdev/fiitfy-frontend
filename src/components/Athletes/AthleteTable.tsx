import { apiClient } from '@/config/axios.config';
import { appLink } from '@/config/links';
import { useDebounce } from '@/hooks/useDebounce';
import { Athlete, AthleteResponse } from '@/types';
import { EndpointType } from '@/types/api';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { EyeIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table } from '../ui/table';
import { totalAthletesAtom } from '@/store/athletes';



interface AthleteTableProps {
  searchQuery: string;
  currentPage: number;
  pageSize: number;
}

// Fetches athletes by name for search functionality
const fetchAthletesBySearch = async (searchQuery: string) => {
  const response = await apiClient.get(`${EndpointType.Athlete}/search`, {
    params: { name: searchQuery },
  });
  return response.data;
};

// Fetches athletes based on pagination parameters
const fetchAthletes = async (
  currentPage: number,
  rowsPerPage: number
): Promise<AthleteResponse> => {
  const response = await apiClient.get(`${EndpointType.Athlete}/list`, {
    params: { page: currentPage, limit: rowsPerPage },
  });
  return response.data;
};

const AthleteTable: React.FC<AthleteTableProps> = ({
  searchQuery,
  currentPage: page,
  pageSize,
}) => {
  const navigate = useNavigate();
  const setTotalAthletes = useSetAtom(totalAthletesAtom);

  // Use the debounced search query with a 3-second delay
  const debouncedSearchQuery = useDebounce(searchQuery, 600, 3);

  const {
    data: athletes,
    isLoading,
    error,
  } = useQuery<AthleteResponse>({
    queryKey: ['athletes', debouncedSearchQuery, page, pageSize],
    queryFn: () =>
      debouncedSearchQuery.length >= 4
        ? fetchAthletesBySearch(debouncedSearchQuery)
        : fetchAthletes(page, pageSize),
    enabled: debouncedSearchQuery.length === 0 || debouncedSearchQuery.length >= 4,
  });

  useEffect(() => {
    if (athletes) {
      setTotalAthletes(athletes.pagination?.totalCount);
    }
  }, [athletes, setTotalAthletes]);

  if (isLoading) {
    return <div className='w-full h-10'>Loading...</div>;
  }

  if (error) {
    return <div>Error loading athletes</div>;
  }

  return (
    <ScrollArea className='max-h-48'>
      <Table>
        <AthleteTableHeader />
        <tbody className='bg-white'>
          {athletes?.data.map((athlete: Athlete) => (
            <tr key={athlete.id} className='border-t'>
              <td className='px-4 py-2'>
                <div className='flex items-center'>
                  <img
                    src={
                      athlete.profileImageUrl ||
                      'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif'
                    }
                    alt={athlete.firstName}
                    className='w-8 h-8 mr-2 rounded-full'
                  />
                  <div>
                    <div className='font-medium'>{`${athlete.firstName} ${athlete.lastName}`}</div>
                    <div className='text-sm text-gray-500'>
                      {athlete.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className='px-4 py-2'>{athlete.phone || 'N/A'}</td>
              <td className='px-4 py-2'>{athlete.gender || 'N/A'}</td>
              <td className='px-4 py-2'>
                <Badge>{!athlete.isCoach ? 'Active' : 'Inactive'}</Badge>
              </td>
              <td className='px-4 py-2'>
                <div className='flex space-x-2'>
                  <Button size={'sm'} variant={'outline'}>
                    Edit
                  </Button>
                  <Button variant={'destructive'} size={'sm'}>
                    Delete
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(`${appLink.athleteDetail(athlete.id).href}`)
                    }
                    size={'sm'}
                  >
                    <EyeIcon className='w-3.5' />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default AthleteTable;

const AthleteTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className='border-l border-r bg-gray-50'>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Name
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Phone
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Gender
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Status
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Actions
        </th>
      </tr>
    </thead>
  );
};
