import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useCancelCheckIn } from "@/hooks/useCancelCheckIn";
import { useCancelEnrollment } from "@/hooks/useCancelEnrollment";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useEnrollmentStatus } from "@/hooks/useEnrollmentStatus";
import {
  AttendanceStatus,
  ClassEnrollment,
  ClassEnrollmentStatus,
  Role,
} from "@/types";
import { MapPin, XIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface EnrollmentListProps {
  enrollments: ClassEnrollment[];
  classId: string;
}

const ClassEnrollmentList: React.FC<EnrollmentListProps> = ({
  enrollments,
  classId,
}) => {
  const { user } = useAuth();
  const { cancelCheckIn, cancelCheckInLoading } = useCancelCheckIn();
  const { mutate: checkInMutation, isPending: isCheckInLoading } = useCheckIn();
  const { mutate: cancelEnrollment } = useCancelEnrollment(classId);
  const { mutate: updateStatus } = useEnrollmentStatus();

  const isAdmin = user?.role === Role.ADMIN;

  // State for active tab
  const [activeTab, setActiveTab] = useState<ClassEnrollmentStatus | "ALL">(
    ClassEnrollmentStatus.ENROLLED
  );

  // Filter enrollments based on the active tab
  const filteredEnrollments =
    activeTab === "ALL"
      ? enrollments
      : enrollments.filter((enrollment) => enrollment.status === activeTab);

  // Sort enrollments by status and createdAt
  const sortedEnrollments = filteredEnrollments.sort((a, b) => {
    const statusOrder = [
      ClassEnrollmentStatus.ENROLLED,
      ClassEnrollmentStatus.WAITLISTED,
      ClassEnrollmentStatus.CANCELED,
    ];
    const getStatusIndex = (status?: ClassEnrollmentStatus) =>
      status ? statusOrder.indexOf(status) : -1;

    if (a.status === b.status) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return getStatusIndex(a.status) - getStatusIndex(b.status);
  });

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    updateStatus({ enrollmentId: id, status: status });
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) =>
        setActiveTab(value as ClassEnrollmentStatus | "ALL")
      }
      className="w-full h-full overflow-hidden"
    >
      {/* Tabs for filtering */}
      <TabsList className="mb-4">
        <TabsTrigger value="ALL">ALL</TabsTrigger>
        <TabsTrigger value={ClassEnrollmentStatus.ENROLLED}>
          {ClassEnrollmentStatus.ENROLLED}
        </TabsTrigger>
        <TabsTrigger value={ClassEnrollmentStatus.WAITLISTED}>
          {ClassEnrollmentStatus.WAITLISTED}
        </TabsTrigger>
        <TabsTrigger value={ClassEnrollmentStatus.CANCELED}>
          {ClassEnrollmentStatus.CANCELED}
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="h-full">
        {sortedEnrollments.length === 0 ? (
          <p className="text-center text-gray-500">No enrollments found.</p>
        ) : (
          <ScrollArea className="h-fit ">
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Athlete</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEnrollments.map((enrollment) => {
                    const isLoggedUser =
                      user?.athlete?.id === enrollment.athleteId;

                    const canCheckIn =
                      !enrollment.isCheckedIn &&
                      enrollment.status === ClassEnrollmentStatus.ENROLLED &&
                      (isLoggedUser || isAdmin);

                    const canCheckOut =
                      enrollment.isCheckedIn && (isLoggedUser || isAdmin);

                    const canCancel =
                      isAdmin ||
                      (isLoggedUser &&
                        enrollment.status === ClassEnrollmentStatus.ENROLLED);

                    return (
                      <TableRow key={enrollment.id}>
                        {/* Athlete Info */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="hidden p-1 rounded-full xl:block">
                              <AvatarImage
                                className="rounded-full h-7 w-7"
                                src={enrollment.athlete.profileImageUrl}
                                alt={enrollment.athlete.firstName}
                              />
                            </Avatar>
                            <span className="truncate max-w-24">{`${enrollment.athlete.firstName}`}</span>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Select
                          
                            defaultValue={AttendanceStatus.BOOKED}
                            onValueChange={(value: AttendanceStatus) =>
                              handleStatusChange(enrollment.id, value)
                            }
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BOOKED">Booked</SelectItem>
                              <SelectItem value="ATTENDED">Attended</SelectItem>
                              <SelectItem value="MISSED">Missed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {canCheckIn && (
                              <Button
                                size="xs"
                                onClick={() => checkInMutation(enrollment.id)}
                                disabled={isCheckInLoading}
                              >
                                <MapPin className="w-3.5" />
                              </Button>
                            )}
                            {canCheckOut && (
                              <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="xs"
                                      variant="outline"
                                      onClick={() =>
                                        cancelCheckIn(enrollment.id)
                                      }
                                      disabled={cancelCheckInLoading}
                                    >
                                      <XIcon className="w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Check-out</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {canCancel && (
                              <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="xs"
                                      variant="destructive"
                                      onClick={() =>
                                        cancelEnrollment(enrollment.id)
                                      }
                                    >
                                      <XIcon className="w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Cancel enrollment</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ClassEnrollmentList;
