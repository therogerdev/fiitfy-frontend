import { Athlete } from '@/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

const fetchAthleteBySearch = async (searchQuery: string) => {
  if (!searchQuery.trim()) {
    return []; // Return an empty array if the search query is empty
  }

  const response = await apiClient.get(
    `${EndpointType.Athlete}/search`,
    {
      params: { name: searchQuery },
    }
  );
  return response.data;
};

const SearchAthlete = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setSelectedAthleteId] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data: athleteResults, refetch } = useQuery({
    queryKey: ['searchAthlete', debouncedSearchQuery],
    queryFn: () => fetchAthleteBySearch(debouncedSearchQuery),
    enabled: false,
  });

  // Trigger search when the debounced value changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      refetch().catch((error: Error) => {
        console.error('Error fetching athletes:', error);
      });
    }
  }, [debouncedSearchQuery, refetch]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  return (
    <div>
      <h1>Search Athlete</h1>
      <Input
        type='search'
        placeholder='Search Athlete...'
        value={searchQuery}
        onChange={handleSearchChange}
        className='md:w-[100px] lg:w-[600px] hidden md:block'
      />
      {debouncedSearchQuery && athleteResults?.data && (
        <div className='mt-4'>
          <ul>
            {athleteResults.data
              .slice(0, 10)
              .map((athlete: Athlete) => (
                <li key={athlete.id} className='flex justify-between'>
                  <span>{`${athlete.firstName} ${athlete.lastName}`}</span>
                  <Button
                    size='sm'
                    onClick={() => setSelectedAthleteId(athlete.id)}
                  >
                    Enroll
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchAthlete;
