import ProgramList from '@/components/Programs/ProgramList';
import ContentLayout from '@/components/ui/content-layout';

const ProgramsPage = () => {
  return (
    <ContentLayout className='lg:py-4'>
      <ProgramList />
    </ContentLayout>
  );
};

export default ProgramsPage;
