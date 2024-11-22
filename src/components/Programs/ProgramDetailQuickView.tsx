
import { Sheet, SheetContent } from '../ui/sheet';
import ProgramDetail from './ProgramDetail';

const ProgramDetailPageQuickView = () => {


  return (
    <Sheet defaultOpen>
      <SheetContent size='lg'>
        <ProgramDetail />
      </SheetContent>
    </Sheet>
  );
};

export default ProgramDetailPageQuickView;
