import { apiClient } from '@/config/axios.config';
import { queryClient } from '@/config/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Athlete,
  ClassEnrollment,
  ClassEnrollmentResponse,
  ClassEnrollmentStatus,
  ClientError,
} from '@/types';
import { EndpointType } from '@/types/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  searchQueryAtom,
  selectedAthleteIdAtom,
} from '@/store/class';

const fetchAthleteBySearch = async (
  searchQuery: string
): Promise<Athlete[]> => {
  if (!searchQuery.trim()) {
    return [];
  }

  const response = await apiClient.get<{ data: Athlete[] }>(
    `${EndpointType.Athlete}/search`,
    {
      params: { name: searchQuery },
    }
  );
  return response.data.data;
};

interface SearchAthleteProps {
  classId?: string;
}

const SearchAthlete = ({ classId }: SearchAthleteProps) => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const setSelectedAthleteId = useSetAtom(selectedAthleteIdAtom);
  const { toast } = useToast();
  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data: athleteResults, refetch } = useQuery<Athlete[]>({
    queryKey: ['searchAthlete', debouncedSearchQuery],
    queryFn: () => fetchAthleteBySearch(debouncedSearchQuery),
    enabled: false,
  });

  const enrollMutation = useMutation<
    ClassEnrollment[],
    AxiosError<ClientError>,
    string
  >({
    mutationFn: async (athleteId) => {
      const response = await apiClient.post<ClassEnrollmentResponse>(
        `${EndpointType.Enroll}/${classId}/enroll`,
        { athleteId }
      );
      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['enrollment'] });

      data.forEach((enrollment) => {
        if (enrollment.status === ClassEnrollmentStatus.WAITLISTED) {
          toast({
            title: 'WAITLIST!',
            description: `${enrollment.athlete.firstName} ${enrollment.athlete.lastName} has been added to the waitlist`,
            variant: 'default',
          });
        } else {
          toast({
            title: 'Enrolled!',
            description: `${enrollment.athlete.firstName} ${enrollment.athlete.lastName} has been enrolled successfully`,
            variant: 'info',
          });
        }
      });

      setSelectedAthleteId(null); // Reset selection after successful enrollment
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error ||
        'An unexpected error occurred';

      toast({
        title: 'Enrollment Error',
        description: errorMessage as string,
        variant: 'destructive',
      });
    },
  });

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
    setSearchQuery(event.target.value);
  };

  const handleEnrollClick = (athleteId: string) => {
    setSelectedAthleteId(athleteId);
    enrollMutation.mutate(athleteId); // Trigger the enroll mutation
  };

  return (
    <div>
      <Input
        type='search'
        placeholder='Search Athlete...'
        value={searchQuery}
        onChange={handleSearchChange}
        className=''
      />
      {debouncedSearchQuery && athleteResults && (
        <div className='mt-4'>
          <ul>
            {athleteResults.slice(0, 10).map((athlete) => (
              <li key={athlete.id} className='flex justify-between'>
                <span>{`${athlete.firstName} ${athlete.lastName}`}</span>
                <Button
                  size='sm'
                  onClick={() => handleEnrollClick(athlete.id)}
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
