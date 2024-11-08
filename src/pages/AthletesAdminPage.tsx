import AthleteActions from '@/components/Athletes/AthleteActions';
import AthleteSearchBar from '@/components/Athletes/AthleteSearchBar';
import AthleteTable from '@/components/Athletes/AthleteTable';
import ContentLayout from '@/components/layouts/content-layout';
import { PageHeader } from '@/components/layouts/page-header';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
import { appLink } from '@/config/links';
import {
  currentPageAtom,
  rowsPerPageAtom,
  totalAthletesAtom,
} from '@/store/athletes';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { Outlet } from 'react-router';

const AthletesDetailAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [rowsPerPage, setRowsPerPage] = useAtom(rowsPerPageAtom);
  const totalAthletes = useAtomValue(totalAthletesAtom);

  return (
    <ContentLayout className=''>
      <BreadcrumbComponent links={[appLink.athletes()]} />
      <PageHeader
        title='Athletes'
        actions={
          <AthleteActions
            onFilter={setSearchQuery}
            onAdd={() => console.log('Add Athlete')}
            onPageChange={setCurrentPage}
            totalAthletes={totalAthletes}
            setRowsPerPage={setRowsPerPage}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
        }
      />
      <AthleteSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} // Pass setSearchQuery to AthleteSearchBar
      />
      <AthleteTable
        searchQuery={searchQuery}
        currentPage={currentPage}
        pageSize={10}
      />

      <Outlet />
    </ContentLayout>
  );
};

export default AthletesDetailAdminPage;
