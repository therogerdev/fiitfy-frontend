import AthleteActions from '@/components/Athletes/AthleteActions';
import AthleteSearchBar from '@/components/Athletes/AthleteSearchBar';
import AthleteTable from '@/components/Athletes/AthleteTable';
import ContentLayout from '@/components/layouts/content-layout';
import { PageHeader } from '@/components/layouts/page-header';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
import { appLink } from '@/config/links';
import { Outlet } from 'react-router';


const AthletesAdminPage = () => {
  return (
    <ContentLayout className=''>
      <BreadcrumbComponent links={[appLink.athletes]} />
      <PageHeader title='Athletes' actions={
        <AthleteActions
        onFilter={() => console.log("first")}
        onAdd={() => console.log("first")}
        onPageChange={() => console.log("first")}
        totalAthletes={300}
        setRowsPerPage={() => {}}
        currentPage={1}
        rowsPerPage={10}


      />} />
      <AthleteSearchBar />
      <AthleteTable searchQuery={''} currentPage={1} rowsPerPage={9} />
      <Outlet />
    </ContentLayout>
  );
};

export default AthletesAdminPage;
