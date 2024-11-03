import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Button } from '../ui/button';

const fetchClassDetail = async (id: string) => {
  const response = await apiClient.get(`${EndpointType.Class}/${id}`);

  return response.data;
};

const ClassDetail = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }




  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>{classDetail?.data.name}</h1>
      <p>{classDetail?.data.id}</p>

      <p>{classDetail?.data.description}</p>
      <Button>Enroll to this Class</Button>

    </div>
  );
};

export default ClassDetail;
