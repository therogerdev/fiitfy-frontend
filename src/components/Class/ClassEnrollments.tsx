import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/utils';
import {
    ClassEnrollmentResponse,
    ClassEnrollmentStatus
} from '@/types';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';
import { ClassEnrollAthlete } from './ClassEnrollAthlete';

  interface ClassEnrollmentsProps {
    classId: string;
  }
  // Define a type for the fetch function's parameters
interface FetchEnrollmentParams {
    id: string;
    status?: string;
  }

  // Fetch enrollment data based on class ID and optional status
const fetchEnrollment = async ({ id, status }: FetchEnrollmentParams): Promise<ClassEnrollmentResponse> => {
    const response = await apiClient.get(
      `${EndpointType.Enroll}/${id}/list?status_not=${status?.toUpperCase()}`
    );
    return response.data;
  };

  export const ClassEnrollments: React.FC<ClassEnrollmentsProps> = ({ classId }) => {
    const {
      data: enrollment,
      error,
      isLoading,
    } = useQuery<ClassEnrollmentResponse, AxiosError>({
      queryKey: ['enrollment', classId],
      queryFn: () => fetchEnrollment({ id: classId, status: 'canceled' }),
      enabled: !!classId,
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <Card className='mt-2'>
        <CardHeader>
          <div className='flex justify-between'>
            <div>
              <CardTitle>Enrollments</CardTitle>
              <CardDescription>
                List of all enrolled in this class
              </CardDescription>
            </div>
            <ClassEnrollAthlete classId={classId}>
              <Button size='sm' className='gap-1 h-7'>
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Enroll Athlete
                </span>
              </Button>
            </ClassEnrollAthlete>
          </div>
        </CardHeader>
        <CardContent className='grid gap-6'>
          {(enrollment?.data?.length || 0) > 0 && (
            <div className='grid grid-cols-4 p-0 italic font-semibold'>
              <div className='col-span-2 ml-10'>Athlete</div>
              <div className='col-span-1'>Enrollment</div>
              <div className='col-span-1'>Check-in</div>
            </div>
          )}
          <Separator />
          <ScrollArea className='mt-0 rounded-md max-h-48'>
            <div className='grid grid-cols-1 gap-2 p-4'>
              {(enrollment?.data?.length || 0) === 0 && (
                <Label>No enrollment for this class</Label>
              )}
              {(enrollment?.data || []).map((enrollmentItem) => (
                <div
                  key={enrollmentItem.id}
                  className='grid grid-cols-4 p-0 mt-0 border-b'
                >
                  <div className='flex items-center justify-start col-span-2 text-sm gap-x-2'>
                    <Avatar>
                      <AvatarImage
                        src=''
                        alt={enrollmentItem.athlete.firstName}
                      />
                      <AvatarFallback className='flex items-center justify-center w-10 rounded-full bg-slate-100'>
                        {getInitials(
                          enrollmentItem.athlete.firstName,
                          enrollmentItem.athlete.lastName
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <p className='text-sm font-semibold'>
                      {`${enrollmentItem.athlete.firstName} ${enrollmentItem.athlete.lastName}`}
                    </p>
                  </div>
                  <div className='text-sm'>
                    <Badge
                      variant={
                        enrollmentItem.status === ClassEnrollmentStatus.WAITLISTED
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {enrollmentItem.status}
                    </Badge>
                  </div>
                  <div className='text-sm'>
                    {enrollmentItem.isCheckedIn ? (
                      <Badge variant='destructive' className='cursor-pointer'>
                        Check-out
                      </Badge>
                    ) : (
                      <Badge variant='secondary' className='cursor-pointer'>
                        Check-in
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  };
