import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteAlertDialogProps {
  entityName: string;
  onConfirmDelete: () => void;
  isDeleting?: boolean;
}

const DeleteAlertDialog = ({
  entityName,
  onConfirmDelete,
  isDeleting = false,
}: DeleteAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='destructive' className='h-8 gap-1'>
          <Trash2 className='h-3.5 w-3.5' />
          <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
            Delete
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            the {entityName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={onConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : `Yes, Delete ${entityName}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
