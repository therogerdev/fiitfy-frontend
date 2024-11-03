import { apiClient } from '@/config/axios.config';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import {
    ClassEnrollmentResponse,
    ClassEnrollmentStatus
} from '@/types';
import { EndpointType } from '@/types/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router';
import { Button } from '../ui/button';

const fetchClassDetail = async (id: string) => {
  const response = await apiClient.get(`${EndpointType.Class}/${id}`);

  return response.data;
};

const ClassDetail = () => {
  const { user } = useAuth();
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
    onError: (error: AxiosError<{ error: Error }>) => {
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

  console.log(
    `${EndpointType.Enroll}/${classDetail?.data.id}/enroll`
  );

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>{classDetail?.data.name}</h1>
      <p>{classDetail?.data.id}</p>

      <p>{classDetail?.data.description}</p>
      <Button
        onClick={() =>
          mutate({
            classId: classDetail.data.id,
            athleteId: '59147988-1448-404f-8832-b8dfab7ff2df',
          })
        }
      >
        Enroll to this Class
      </Button>
    </div>
  );
};

export default ClassDetail;
