import { useParams } from 'react-router';
import Modal from '../ui/modal';

const AthleteDetailModal = () => {
  const { id } = useParams();
  return <Modal size='md'>AthleteDetailModal {id}</Modal>;
};

export default AthleteDetailModal;
