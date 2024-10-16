import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

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
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { appLink } from '@/config/links';
import { useToast } from '@/hooks/use-toast';
import {
  deleteProgram,
  fetchProgramDetail,
} from '@/services/program';
import { ProgramDetailResponse } from '@/types/program';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import BreadcrumbComponent from '../ui/BreadcrumbsComponent';
import ContentLayout from '../ui/content-layout';
import { queryClient } from '@/config/queryClient';

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    data: program,
    error,
    isLoading,
  } = useQuery<ProgramDetailResponse>({
    queryKey: ['program', slug],
    queryFn: () => fetchProgramDetail(slug as string),
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        variant: 'destructive',
        title: data.message,
        description: `${program?.data.attributes.name} has been deleted.`,
      });

      navigate('/programs');
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching program details.</p>;

  // Func copy ID to the clipboard
  const handleCopyId = (id: string | undefined) => {
    if (id) {
      navigator.clipboard
        .writeText(id)
        .then(() => {
          toast({
            variant: 'info',
            title: 'Copied!',
            description: `Program ID ${id} has been copied to clipboard.`,
          });
        })
        .catch((error) => {
          console.error('Failed to copy program ID: ', error);
        });
    }
  };

  const breadcrumbLinks = [
    appLink.programs,
    appLink.programDetail(
      slug || '',
      program?.data.attributes.name || ''
    ),
  ];

  return (
    <ContentLayout>
      <BreadcrumbComponent links={breadcrumbLinks} />
      <main className='grid items-start flex-1 gap-4 p-4 sm:px-0 sm:py-0 md:gap-8'>
        <Card className='overflow-hidden'>
          <CardHeader className='flex flex-row items-start bg-muted/50'>
            <div className='grid gap-0.5'>
              <CardTitle className='flex items-center gap-2 text-lg group'>
                {program?.data.attributes.name}
              </CardTitle>

              <CardDescription className='group'>
                {program?.data.id}
                <Button
                  size='icon'
                  variant='outline'
                  className='w-6 h-6 transition-opacity opacity-0 group-hover:opacity-100'
                  onClick={() => handleCopyId(program?.data.id)}
                >
                  <Copy className='w-3 h-3' />
                  <span className='sr-only'>Copy Program ID</span>
                </Button>
              </CardDescription>
            </div>
            <div className='flex items-center gap-1 ml-auto'>
              <Button
                size='sm'
                variant='outline'
                className='h-8 gap-1'
                onClick={() =>
                  navigate(
                    `/program/${program?.data.attributes.slug}/edit`
                  )
                }
              >
                <Pencil className='h-3.5 w-3.5' />
                <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
                  Edit Program
                </span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size='sm'
                    variant='destructive'
                    className='h-8 gap-1'
                  >
                    <Trash2 className='h-3.5 w-3.5' />
                    <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
                      Delete
                    </span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will
                      permanently delete the program and remove your
                      data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className={buttonVariants({
                        variant: 'destructive',
                      })}
                      onClick={() => mutate(program?.data.id || '')}
                    >
                      Yes, Delete it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className='p-6 text-sm'>
            {/* Program details */}
            <div className='grid gap-3'>
              <div className='font-semibold'>Description</div>
              <CardDescription>
                {program?.data.attributes.description}
              </CardDescription>
              <Separator className='my-2' />
              <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Program Period (weeks)
                  </span>
                  <span>{program?.data.attributes.numWeeks}</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Duration (Minutes)
                  </span>
                  <span>60</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Status
                  </span>
                  <Badge>
                    {program?.data.attributes.active
                      ? 'Active'
                      : 'Inactive'}
                  </Badge>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Total Classes (Week)
                  </span>
                  <span>
                    {program?.data.attributes.numClassesPerWeek}
                  </span>
                </li>
              </ul>
            </div>
            <Separator className='my-4' />
            {/* System Information */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-3'>
                <div className='font-semibold'>
                  System Information
                </div>
                <div className='grid gap-0.5 not-italic text-muted-foreground'>
                  <li className='flex items-center justify-between w-64'>
                    <span className='text-muted-foreground'>
                      Created At
                    </span>
                    <span> - </span>
                  </li>
                  <li className='flex items-center justify-between w-64'>
                    <span className='text-muted-foreground'>
                      Updated At
                    </span>
                    <span> - </span>
                  </li>
                </div>
              </div>
            </div>
            <Separator className='my-4' />
            {/* Calendar */}
            <div className='grid gap-3'>
              <div className='font-semibold'>Calendar</div>
              <dl className='grid gap-3'>TO BE IMPLEMENTED...</dl>
            </div>
          </CardContent>
        </Card>
      </main>
    </ContentLayout>
  );
};

export default ProgramDetailPage;