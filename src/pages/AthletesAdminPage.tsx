import AthleteActions from '@/components/Athletes/AthleteActions';
import AthleteSearchBar from '@/components/Athletes/AthleteSearchBar';
import AthleteTable from '@/components/Athletes/AthleteTable';
import ContentLayout from '@/components/layouts/content-layout';
import { PageHeader } from '@/components/layouts/page-header';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
import { Button } from '@/components/ui/button';
import { appLink } from '@/config/links';
import { Outlet } from 'react-router';

const AthletesAdminPage = () => {
  return (
    <ContentLayout className=''>
      <BreadcrumbComponent links={[appLink.athletes]} />
      <PageHeader title="Athletes" actions={
        <>
        <Button>Action 1</Button>
        <Button variant={"outline"}>Action 2</Button>
        </>
      } />
      <AthleteActions />
      <AthleteSearchBar />
      <AthleteTable />
      <Outlet />
    </ContentLayout>
  );
};

export default AthletesAdminPage;
