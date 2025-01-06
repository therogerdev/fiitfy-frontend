  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import SearchAthlete from './SearchAthlete';

export const ClassEnrollAthlete = ({
    classId,
    children,
  }: {
    classId?: string;
    children: React.ReactNode;
  }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className='flex flex-col min-h-72'>
          <DialogTitle>Select Athlete</DialogTitle>
          <DialogDescription>
            Find athletes to enroll to this class
          </DialogDescription>
          <SearchAthlete classId={classId} />
        </DialogContent>
      </Dialog>
    );
  };
