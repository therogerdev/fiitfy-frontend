import { apiClient } from '@/config/axios.config';
import { useToast } from '@/hooks/use-toast';
import {
    ClassEnrollmentResponse,
    ClassEnrollmentStatus,
    ClientError
} from '@/types';
import { EndpointType } from '@/types/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router';
import { Button } from '../ui/button';
import SearchAthlete from './SearchAthlete';

const fetchClassDetail = async (id: string) => {
  const response = await apiClient.get(`${EndpointType.Class}/${id}`);

  return response.data;
};

const ClassDetail = () => {
  //   const { user } = useAuth();
  const { toast } = useToast();

  const { id } = useParams();
  const {
    data: classDetail,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['class', id],
    queryFn: () => fetchClassDetail(id as string),
    enabled: !!id,
  });

  const { mutate } = useMutation({
    mutationFn: ({
      classId,
      athleteId,
    }: {
      classId: string;
      athleteId: string;
    }) => {
      return apiClient.post(
        `/${EndpointType.Enroll}/${classId}/enroll`,
        {
          athleteId,
        }
      );
    },
    onSuccess: ({
      data: enrollment,
    }: {
      data: ClassEnrollmentResponse;
    }) => {
      if (
        enrollment.data.status === ClassEnrollmentStatus.WAITLISTED
      ) {
        toast({
          variant: 'info',
          title: 'Waitlist',
          description: `This class is full, you are on the waitlist.`,
        });
      } else {
        toast({
          title: 'Success',
          description: `You have successfully enrolled to this class`,
        });
      }
    },
    onError: (error: AxiosError<ClientError>) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `${error?.response?.data?.error}`,
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex'>
      <div className='p-6'>
        <h1 className='text-2xl font-bold'>
          {classDetail?.data.name}
        </h1>
        <p>{classDetail?.data.id}</p>

        <p>{classDetail?.data.description}</p>
        <Button
          onClick={() =>
            mutate({
              classId: classDetail.data.id,
              athleteId: '5446f177-bc52-4e78-a994-efeb77acc23a',
            })
          }
        >
          Enroll to this Class
        </Button>
      </div>
      <div className=''>
        <SearchAthlete />
      </div>
    </div>
  );
};

export default ClassDetail;
