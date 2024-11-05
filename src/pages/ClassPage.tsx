import ContentLayout from '@/components/layouts/content-layout';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { apiClient } from '@/config/axios.config';
import { appLink } from '@/config/links';
import { Class, ClassResponse } from '@/types';
import { EndpointType } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { addDays, format } from 'date-fns';
import { PlusCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const breadcrumbLinks = [appLink.classes];

const ClassPage = () => {
  return (
    <ContentLayout className=''>
      <BreadcrumbComponent links={breadcrumbLinks} />

      <ClassList />
      <Outlet />
    </ContentLayout>
  );
};

export default ClassPage;

// Fetch classes from the API
const fetchAllClasses = async (): Promise<ClassResponse> => {
  const response = await apiClient.get(
    `/${EndpointType.Class}/list?skip=0&take=30&orderBy=date&order=asc`
  );
  return response.data;
};

// ClassList Component
const ClassList = () => {
  const navigate = useNavigate();
  const {
    data: classList,
    error,
    isLoading,
  } = useQuery<ClassResponse>({
    queryKey: ['classList'],
    queryFn: fetchAllClasses,
  });

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  if (isLoading) return <Spinner size='md' containerHeight={400} />;
  if (error instanceof Error)
    return <div>Error: {error.message}</div>;
  return (
    <>
      <div className='flex justify-end'>
        <Button
          onClick={() => navigate(appLink.createClass.href)}
          size='sm'
          className='gap-1 h-7'
        >
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            {appLink.createClass.label}
          </span>
        </Button>
      </div>
      <div className='px-6'>
        <CalendarClassNextSevenDays
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <ClassListView
          classes={classList?.data.map((item) => item) || []}
          selectedDate={selectedDate}
        />
      </div>
    </>
  );
};

// CalendarClassNextSevenDays Component Props and Component
interface CalendarClassNextSevenDaysProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const CalendarClassNextSevenDays: React.FC<
  CalendarClassNextSevenDaysProps
> = ({ selectedDate, onSelectDate }) => {
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(new Date(), i)
  );

  return (
    <div className='grid grid-cols-7 mb-4 space-x-4'>
      {days.map((day) => (
        <CalendarClassNextSevenDays_Item
          key={day.toISOString()}
          day={day}
          isSelected={selectedDate === format(day, 'yyyy-MM-dd')}
          onSelectDate={onSelectDate}
        />
      ))}
    </div>
  );
};

// CalendarClassNextSevenDays_Item Component Props and Component
interface CalendarClassNextSevenDaysItemProps {
  day: Date;
  isSelected: boolean;
  onSelectDate: (date: string) => void;
}

const CalendarClassNextSevenDays_Item: React.FC<
  CalendarClassNextSevenDaysItemProps
> = ({ day, isSelected, onSelectDate }) => {
  const formattedDay = format(day, 'EEE dd');
  return (
    <button
      onClick={() => onSelectDate(format(day, 'yyyy-MM-dd'))}
      className={`px-4 py-2 rounded-md ${
        isSelected ? 'bg-gray-200 font-bold' : 'bg-white border'
      }`}
    >
      <div className='text-xs'>{formattedDay.split(' ')[0]}</div>
      <div className='text-sm'>{formattedDay.split(' ')[1]}</div>
    </button>
  );
};

// ClassListView Component Props and Component
interface ClassListViewProps {
  classes: Class[];
  selectedDate: string;
}

const ClassListView: React.FC<ClassListViewProps> = ({
  classes,
  selectedDate,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [selectedDate]);

  const classesByDate = classes.filter(
    (classItem) =>
      format(classItem.date || new Date(), 'yyyy-MM-dd') ===
      selectedDate
  );

  return (
    <div ref={sectionRef} className='mt-4'>
      {classesByDate.map((classInfo) => (
        <Link to={`/class/${classInfo.id}`} key={classInfo.id}>
          <ClassListItem classInfo={classInfo} />
        </Link>
      ))}
      {classesByDate.length === 0 && (
        <p className='text-gray-500'>
          No classes available for this date.
        </p>
      )}
    </div>
  );
};

// ClassListItem Component Props and Component
interface ClassListItemProps {
  classInfo: Class;
}

const ClassListItem: React.FC<ClassListItemProps> = ({
  classInfo,
}) => {
  return (
    <div className='flex items-center justify-between p-4 mb-2 bg-white border rounded-lg'>
      <div className='flex items-center space-x-4'>
        <div className='text-xs text-gray-500'>
          {format(classInfo.date as Date, 'H:mm a')}
        </div>
        <div>
          <h3 className='font-bold'>{classInfo.name}</h3>
          <div className='text-sm text-gray-500'>
            {classInfo.classType} • Martial Arts •{' '}
            {classInfo.coach?.firstName} {classInfo.coach?.lastName}
          </div>
        </div>
      </div>
      <div className='text-xs text-gray-500'>
        {classInfo.activeEnrollments} Booked
      </div>
    </div>
  );
};
