import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import ProgramDetail from '@/components/Programs/ProgramDetail';
import { appLink } from '@/config/links';
import {
  fetchProgramDetail
} from '@/services/program';
import { ProgramDetailResponse } from '@/types/program';
import ContentLayout from '../components/layouts/content-layout';
import BreadcrumbComponent from '../components/ui/BreadcrumbsComponent';
import Spinner from '../components/ui/spinner';

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();


  const {
    data: program,
    error,
    isLoading,
  } = useQuery<ProgramDetailResponse>({
    queryKey: ['program', slug],
    queryFn: () => fetchProgramDetail(slug as string),
  });



  if (isLoading) return <Spinner size='md' containerHeight={400} />;
  if (error) return <p>Error fetching program details.</p>;



  const breadcrumbLinks = [
    appLink.programs,
    appLink.programDetail(
      slug || '',
      program?.data.attributes.name || ''
    ),
  ];
  return (
    <ContentLayout>
      <BreadcrumbComponent links={breadcrumbLinks} />
      <ProgramDetail />
    </ContentLayout>
  );
};

export default ProgramDetailPage;
