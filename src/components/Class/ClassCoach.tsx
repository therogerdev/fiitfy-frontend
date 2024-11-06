import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';



export const ClassCoach = ({ coachId }: { coachId: string }) => {
    const {
      data: coach,
      error,
      isLoading,
    } = useQuery({
      queryKey: ['class', coachId],
      queryFn: () =>
        apiClient.get(`${EndpointType.Athlete}/${coachId}`),
      enabled: !!coachId,
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className='flex items-center gap-x-5 '>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='' />
          <AvatarFallback>{'CH'}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <Label className='font-bold text-md'>Coach</Label>
          <p className='text-primary'>{`${coach?.data.firstName} ${coach?.data.lastName}`}</p>
        </div>
      </div>
    );
  };
