import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent } from '../ui/sheet';
import BreadcrumbComponent from '../ui/BreadcrumbsComponent';
import { Program } from '@/types/program';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { createProgram } from '@/services/program';
import { queryClient } from '@/config/queryClient';

const ProgramAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      numWeeks: 0,
      numClassesPerWeek: 0,
      slug: '',
      active: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Program) => createProgram(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: 'Success',
        description: `${data.attributes.name} program has been created!`,
        variant: "success"
      });

      navigate(`/programs`);
    },
    onError: () => {
      toast({
        title: 'Error',
        description:
          'Failed to create the program. Please try again.',
      });
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    numWeeks: number;
    numClassesPerWeek: number;
    slug: string;
    active: boolean;
  }) => {
    // Add the missing fields to the form data
    const newProgram: Program = {
      ...data,
      id: '', 
      createdAt: new Date(), 
      attributes: {
        name: data.name,
        description: data.description,
        numWeeks: data.numWeeks,
        numClassesPerWeek: data.numClassesPerWeek,
        slug: data.slug,
        active: data.active,
      },
    };
    mutate(newProgram);
  };
  const breadcrumbLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Programs', href: '/program' },
    { label: 'Add New Program', href: '#' },
  ];

  return (
    <Sheet defaultOpen>
      <SheetContent size='lg'>
        <BreadcrumbComponent links={breadcrumbLinks} />
        <main className='grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          <Card className='overflow-hidden'>
            <CardHeader className='flex flex-row items-start bg-muted/50'>
              <div className='grid gap-0.5'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <Input
                    {...register('name', {
                      required: 'Program name is required',
                    })}
                    placeholder='Program Name'
                  />
                  {errors.name && (
                    <p className='text-sm text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </CardTitle>
                <CardDescription>
                  <Input
                    {...register('description', {
                      required: 'Program description is required',
                    })}
                    placeholder='Program Description'
                  />
                  {errors.description && (
                    <p className='text-sm text-red-500'>
                      {errors.description.message}
                    </p>
                  )}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className='p-6 text-sm'>
              <div className='grid gap-3'>
                <div className='font-semibold'>Program Details</div>
                <ul className='grid gap-3'>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Slug
                    </span>
                    <Input
                      {...register('slug', {
                        required: 'Slug is required',
                      })}
                      placeholder='Program Slug'
                    />
                    {errors.slug && (
                      <p className='text-sm text-red-500'>
                        {errors.slug.message}
                      </p>
                    )}
                  </li>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Program Period (weeks)
                    </span>
                    <Input
                      {...register('numWeeks', {
                        required: 'Number of weeks is required',
                      })}
                      type='number'
                      placeholder='Weeks'
                    />
                    {errors.numWeeks && (
                      <p className='text-sm text-red-500'>
                        {errors.numWeeks.message}
                      </p>
                    )}
                  </li>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Classes Per Week
                    </span>
                    <Input
                      {...register('numClassesPerWeek', {
                        required:
                          'Number of classes per week is required',
                      })}
                      type='number'
                      placeholder='Classes Per Week'
                    />
                    {errors.numClassesPerWeek && (
                      <p className='text-sm text-red-500'>
                        {errors.numClassesPerWeek.message}
                      </p>
                    )}
                  </li>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Status
                    </span>
                    <Badge>Inactive</Badge>
                    <input type='checkbox' {...register('active')} />
                  </li>
                </ul>
              </div>
              <Separator className='my-4' />
              <div className='flex justify-end space-x-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  onClick={handleSubmit(onSubmit)}
                  disabled={isPending}
                >
                  {isPending ? 'Saving...' : 'Create Program'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default ProgramAdd;
