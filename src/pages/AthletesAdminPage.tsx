import ContentLayout from '@/components/layouts/content-layout';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
import { appLink } from '@/config/links';
import { Outlet } from 'react-router';

const AthletesAdminPage = () => {
  return (
    <ContentLayout className=''>
      <BreadcrumbComponent links={[appLink.athletes]} />
      <Outlet />
    </ContentLayout>
  );
};

export default AthletesAdminPage;
