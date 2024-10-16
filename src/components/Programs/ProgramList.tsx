import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EndpointType } from '../../types/types';

const ProgramList = () => {
  const {
    isLoading,
    error,
    data: programs,
  } = useQuery({
    queryKey: ['programs'],
    queryFn: () =>
      axios
        .get(
          `${import.meta.env.VITE_BASE_API_URL}/${
            EndpointType.AllProgram
          }`
        )
        .then((res) => res.data),
  });

  if (isLoading) return <p>'Loading...'</p>;
  if (error) return <p>'An error has occurred: ' + error.message</p>;

  return <div>{JSON.stringify(programs, null, 2)}</div>;
};

export default ProgramList;
