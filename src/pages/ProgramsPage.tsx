import ProgramTabs from '@/components/Programs/ProgramTabs';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
import ContentLayout from '@/components/ui/content-layout';
import { appLink } from '@/config/links';

const breadcrumbLinks = [appLink.programs];

const ProgramsPage = () => {
  return (
    <ContentLayout className=''>
      <BreadcrumbComponent links={breadcrumbLinks} />
      <ProgramTabs />
    </ContentLayout>
  );
};

export default ProgramsPage;
