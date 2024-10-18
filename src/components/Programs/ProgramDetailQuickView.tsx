import { useNavigate } from 'react-router-dom';

import { Sheet, SheetContent } from '../ui/sheet';
import ProgramDetail from './ProgramDetail';

const ProgramDetailPageQuickView = () => {
  const navigate = useNavigate();


  return (
    <Sheet defaultOpen>
      <SheetContent size='lg' onClose={() => navigate(-1)}>
        <ProgramDetail />
      </SheetContent>
    </Sheet>
  );
};

export default ProgramDetailPageQuickView;
