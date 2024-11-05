import { useQuery } from '@tanstack/react-query';
import { addDays, format, isToday, isTomorrow, isAfter } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../ui/spinner';
import { apiClient } from '@/config/axios.config';
import { EndpointType } from '@/types/api';
import { ClassResponse, Class } from '@/types';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Users2 } from 'lucide-react';

// Fetch classes from API
const fetchAllClasses = async (): Promise<ClassResponse> => {
  const response = await apiClient.get(
    `/${EndpointType.Class}/list?orderBy=startTime&order=asc`
  );
  return response.data;
};

// ClassList Component
const ClassList = () => {
  const { data: classList, error, isLoading } = useQuery<ClassResponse>({
    queryKey: ['classes'],
    queryFn: fetchAllClasses,
  });

  if (isLoading) return <Spinner size="md" containerHeight={400} />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  console.log(classList?.data)
  return <LiveClasses classes={classList?.data.map((item) => item) || []} />;
};

export default ClassList;

// Helper Functions
const getNextSevenDays = () => Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

const formatDate = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEEE, MMM d');
};

// Calendar Component Props and Component
interface CalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate }) => {
  const days = getNextSevenDays();

  return (
    <div className="grid grid-cols-7 mb-4 space-x-4">
      {days.map((day) => {
        const formattedDay = format(day, 'EEE dd');
        const isSelected = selectedDate === format(day, 'yyyy-MM-dd');

        return (
          <button
            key={formattedDay}
            onClick={() => onSelectDate(format(day, 'yyyy-MM-dd'))}
            className={`px-4 py-2 rounded-md bg-white border ${isSelected ? 'bg-gray-200 font-bold' : ''}`}
          >
            <div className="text-xs">{formattedDay.split(' ')[0]}</div>
            <div className="text-sm">{formattedDay.split(' ')[1]}</div>
          </button>
        );
      })}
    </div>
  );
};

// ClassCard Component Props and Component
interface ClassCardProps {
  classInfo: Class;
}

const ClassCard: React.FC<ClassCardProps> = ({ classInfo }) => (
  <div className="flex items-center justify-between p-4 mb-2 bg-white border rounded-lg">
    <div className="flex items-center space-x-4">
      <div className="text-xs text-gray-500">{format(classInfo?.startTime || new Date(), 'H:mm a')}</div>
      <Avatar>
        <AvatarImage className="w-16 rounded-full" src={classInfo.coach?.profileImageUrl} alt={classInfo.coach?.firstName} />
        <AvatarFallback>{classInfo.coach?.firstName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-bold">{classInfo.name}</h3>
        <div className="text-sm text-gray-500">
          {classInfo.classType} • {classInfo.coach?.firstName} {classInfo.coach?.lastName}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <Button>
        <Users2 className="w-4 h-4 mr-2" />
        Attendees
      </Button>
      <div className="text-xs text-gray-500">{classInfo.activeEnrollments} Booked</div>
    </div>
  </div>
);

// LiveClasses Component Props and Component
interface LiveClassesProps {
  classes: Class[];
}

const LiveClasses: React.FC<LiveClassesProps> = ({ classes }) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Filter classes to only include those starting today or in the future
  const filteredClasses = classes.filter((classItem) =>
    isAfter(new Date(classItem.startTime || ''), new Date()) || isToday(new Date(classItem.startTime || ''))
  );

  // Sort and group classes by date and startTime within each date group
  const classesByDate = filteredClasses.reduce((acc: { [key: string]: Class[] }, classItem) => {
    const date = format(classItem.startTime || new Date(), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(classItem);
    acc[date].sort((a, b) => new Date(a.startTime || 0).getTime() - new Date(b.startTime || 0).getTime()); // Sort by startTime
    return acc;
  }, {});

  const sortedDates = Object.keys(classesByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  useEffect(() => {
    if (sectionRefs.current[selectedDate]) {
      sectionRefs.current[selectedDate]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedDate]);

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="p-6">
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        {sortedDates.map((date) => (
          <section key={date} ref={(el) => (sectionRefs.current[date] = el as HTMLDivElement)} className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">{formatDate(new Date(date))}</h3>
            {classesByDate[date].map((classInfo) => (
              <ClassCard key={classInfo.id} classInfo={classInfo} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};
