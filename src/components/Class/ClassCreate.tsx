'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { apiClient } from '@/config/axios.config';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';
import BreadcrumbComponent from '../ui/BreadcrumbsComponent';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Sheet, SheetContent } from '../ui/sheet';
import CoachSelect from './CoachSelect';
import { Athlete, ClientError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

const FormSchema = z.object({
  name: z.string().min(1, 'Class name is required.'),
  description: z.string().optional(),
  date: z.union([z.date(), z.string().datetime()]), // Allows string or Date
  startTime: z.union([z.date(), z.string().datetime()]).optional(),
  endTime: z.union([z.date(), z.string().datetime()]).optional(),
  recurrenceEnd: z
    .union([z.date(), z.string().datetime()])
    .optional(),
  coachId: z.string().optional(),
  capacity: z.preprocess((val) => {
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().min(1, 'Capacity must be at least 1.')),
  programsId: z.string().optional(),
  classType: z.enum(
    ['CROSSFIT', 'YOGA', 'HIIT', 'WEIGHTLIFTING', 'MUAYTHAI'],
    { required_error: 'Class type is required.' }
  ),
  recurrenceType: z
    .enum(['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'CUSTOM'], {
      required_error: 'Recurrence type is required.',
    })
    .optional(),
  isRecurring: z.boolean(),
  isOnline: z.boolean().default(false),
  location: z.string().optional(),
});

function ClassCreate() {
  const breadcrumbLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Classes', href: '/classes' },
    { label: 'Add New Class', href: '#' },
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
                  Create New Class
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-6 text-sm'>
              <ClassCreateForm />
            </CardContent>
          </Card>
        </main>
      </SheetContent>
    </Sheet>
  );
}

export default ClassCreate;

const classTypes = [
  'CROSSFIT',
  'YOGA',
  'HIIT',
  'WEIGHTLIFTING',
  'MUAYTHAI',
];
const recurrenceType = [
  'DAILY',
  'WEEKLY',
  'BIWEEKLY',
  'MONTHLY',
  'CUSTOM',
];

const ClassCreateForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Define mutation
  const createClassMutation = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return apiClient.post('/class/create', {
        ...data,
        startTime: new Date(),
        endTime: new Date(),
        isRecurring: data.isRecurring || false,
        recurrenceEnd: data.recurrenceEnd ? data.recurrenceEnd : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classList'] });
      navigate('/class');
      toast({
        title: 'Success!',
        description: 'The class has been created successfully.',
        variant: 'default',
      });
    },
    onError: (error: AxiosError<ClientError>) => {
      toast({
        title: 'Something went wrong!!',
        description: error.response?.data.error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Submitting data:', data);
    createClassMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        {/* Class Name Field */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter class name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter class description'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Coach Selection Field */}
        <FormField
          control={form.control}
          name='coachId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coach</FormLabel>
              <CoachSelect
                onSelectCoach={(coach: Athlete) => {
                  field.onChange(coach.id);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Time Field */}
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={(field.value as Date) || ''}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Recurrence Checkbox */}
        <FormField
          control={form.control}
          name='isRecurring'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Recurrence</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(!!checked)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditionally render Recurrence End Date if isRecurrence is true */}
        {form.watch('isRecurring') && (
          <FormField
            control={form.control}
            name='recurrenceEnd'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Recurrence End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={(field.value as Date) || ''}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Capacity Field */}
        <FormField
          control={form.control}
          name='capacity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  placeholder='Enter capacity'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Class Type Select */}
        <FormField
          control={form.control}
          name='classType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select class type' />
                  </SelectTrigger>
                  <SelectContent>
                    {classTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Recurrence Type Select */}
        <FormField
          control={form.control}
          name='recurrenceType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurrence Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select recurrence type' />
                  </SelectTrigger>
                  <SelectContent>
                    {recurrenceType.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Program ID Field */}
        <FormField
          control={form.control}
          name='programsId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program ID (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter program ID (optional)'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Create Class</Button>
      </form>
    </Form>
  );
};
