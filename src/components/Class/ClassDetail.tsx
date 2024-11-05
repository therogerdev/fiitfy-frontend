import { apiClient } from '@/config/axios.config';
import { selectedAthleteIdAtom } from '@/store/class';
import { EndpointType } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Modal from '../ui/modal';
import { ClassEnrollments } from './ClassEnrollments';
import { ClassInfo } from './ClassInfo';

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

  const selectedAthleteId = useAtomValue(selectedAthleteIdAtom);

  useEffect(() => {}, [selectedAthleteId]);

  const navigate = useNavigate();

  if (isLoading) {
    return <Modal size='lg'>Loading...</Modal>;
  }

  if (error) {
    return <Modal size='lg'>Error: {error.message}</Modal>;
  }

  // handle close modal
  const closeModal = () => {
    navigate(-1);
  };

  return (
    <Modal
      size='lg'
      title={classDetail.data.name}
      description=' Manage class settings and set preferences.'
      onClose={() => closeModal()}
    >
      <ClassInfo
        id={classDetail.data.id}
        className={classDetail.data.name}
        description={classDetail.data.description}
        date={classDetail.data.date}
        time={classDetail.data.time}
        duration={classDetail.data.duration}
        coachId={classDetail.data.coachId}
      />

      <ClassEnrollments classId={classDetail.data.id} />
    </Modal>
  );
};

export default ClassDetail;
