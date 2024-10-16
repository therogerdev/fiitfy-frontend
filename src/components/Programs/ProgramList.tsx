import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EndpointType } from '../../types/api';
import { Program, ProgramsResponse } from '@/types/Program';
import { Link } from 'react-router-dom';

const ProgramList = () => {
  const {
    isLoading,
    error,
    data: programs,
  } = useQuery<ProgramsResponse>({
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

  return (
    <div>
    <h1>Programs</h1>
    <ul>
      {programs?.data.map((program: Program) => (
        <li key={program.id}>
          <Link to={`/program/${program.attributes.slug}`}>
            {program.attributes.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ProgramList;
