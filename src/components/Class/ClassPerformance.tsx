import { useListPerformance } from "@/hooks/useListPerformance";
import { getInitials } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { FC, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { ClassDetailLayout } from "./ClassDetailLayout";

interface ClassPerformanceProps {
  classId?: string;
  workoutId?: string;
}
const ClassPerformance: FC<ClassPerformanceProps> = ({ classId }) => {
  const [currentPage] = useState(1);
  const rowsPerPage = 10;
  const { performanceList, isLoading, error } = useListPerformance(
    currentPage,
    rowsPerPage,
    {
      classId,
    }
  );

  if (isLoading) {
    return <ClassPerformanceLoading />;
  }

  if (error) {
    return <ClassDetailLayout>Error: {error.message}</ClassDetailLayout>;
  }

  return (
    <Card className="border-b border-l-0 border-r-0 rounded-none">
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-y-5">
        <ScrollArea className="h-full">
          <div className="flex flex-col space-y-1">
            {performanceList?.map((performance) => (
              <div
                key={performance.id}
                className="flex items-center px-2 py-2 bg-white border-b rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={performance.athlete?.profileImageUrl}
                      alt={performance.id}
                    />
                    <AvatarFallback className="flex items-center justify-center p-2 rounded-full bg-slate-100">
                      {getInitials(
                        performance.athlete?.firstName as string,
                        performance.athlete?.lastName as string
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-start">
                    <span className="block font-bold text-gray-900">
                      {` ${performance.athlete?.firstName} ${performance.athlete?.lastName}`}{" "}
                    </span>
                    <span className="block text-gray-600 font-regular">
                      {performance.movement?.name}
                    </span>
                    <span className="block text-sm text-gray-600">
                      {`1 x ${performance.reps} @ ${performance.weight} ${performance.weightUnit}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ClassPerformance;

const ClassPerformanceLoading = () => {
  return (
    <Card className="border-b border-l-0 border-r-0 rounded-none">
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-y-5">
        <ScrollArea className="h-full">
          <div className="flex flex-col space-y-3">
            {/* Simulate multiple loading rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar skeleton */}
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col items-start justify-start space-y-1">
                    {/* Name skeleton */}
                    <Skeleton className="w-32 h-4" />
                    {/* Movement skeleton */}
                    <Skeleton className="w-24 h-3" />
                    {/* Details skeleton */}
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export { ClassPerformanceLoading };
