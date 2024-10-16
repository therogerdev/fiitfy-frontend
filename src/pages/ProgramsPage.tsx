import ContentLayout from '@/components/layouts/content-layout';
import ProgramTabs from '@/components/Programs/ProgramTabs';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
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
