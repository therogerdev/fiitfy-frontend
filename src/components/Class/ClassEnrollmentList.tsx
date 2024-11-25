import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
import { useEnrollmentAttendance } from "@/hooks/useEnrollmentAttendance";
import { cn } from "@/lib/utils";
import {
  AttendanceStatus,
  ClassEnrollment,
  ClassEnrollmentStatus,
  Role,
} from "@/types";
import { XIcon } from "lucide-react";
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
  const { mutate: checkInMutation, isPending: isCheckInLoading } =
    useCheckIn(classId);
  const { mutate: cancelEnrollment } = useCancelEnrollment(classId);
  const { mutate: attendanceMutation } = useEnrollmentAttendance();

  const isAdmin = user?.role === Role.ADMIN;

  // State for active tab
  const [activeTab, setActiveTab] = useState<
    AttendanceStatus | ClassEnrollmentStatus.ENROLLED
  >(ClassEnrollmentStatus.ENROLLED);

  // Filter enrollments based on the active tab
  const filteredEnrollments = enrollments.filter((enrollment) => {
    if (
      Object.values(ClassEnrollmentStatus).includes(
        activeTab as ClassEnrollmentStatus
      )
    ) {
      return enrollment.status === activeTab;
    }

    if (
      Object.values(AttendanceStatus).includes(activeTab as AttendanceStatus)
    ) {
      return enrollment.attendanceStatus === activeTab;
    }

    return false;
  });

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
    attendanceMutation({ enrollmentId: id, status });
  };
  

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) =>
        setActiveTab(value as AttendanceStatus | ClassEnrollmentStatus.ENROLLED)
      }
      className="w-full h-full overflow-hidden"
    >
      {/* Tabs for filtering */}
      <TabsList className="mb-4">
        <TabsTrigger value={ClassEnrollmentStatus.ENROLLED}>
          {ClassEnrollmentStatus.ENROLLED}
        </TabsTrigger>
        <TabsTrigger value={AttendanceStatus.ATTENDED}>
          {AttendanceStatus.ATTENDED}
        </TabsTrigger>

        <TabsTrigger value={AttendanceStatus.MISSED}>
          {AttendanceStatus.MISSED}
        </TabsTrigger>

        <TabsTrigger value={ClassEnrollmentStatus.CANCELED}>
          {ClassEnrollmentStatus.CANCELED}
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="h-full">
        {sortedEnrollments.length === 0 && (
          <p className="text-center text-gray-500">No enrollments found.</p>
        )}

        {sortedEnrollments.length > 0 && (
          <ScrollArea className="h-96">
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Athlete</TableHead>
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
                          <div className="flex items-center gap-0">
                            <Avatar className="hidden p-1 rounded-full xl:block">
                              <AvatarImage
                                className="rounded-full h-7 w-7"
                                src={enrollment.athlete.profileImageUrl}
                                alt={enrollment.athlete.firstName}
                              />
                            </Avatar>
                            <span
                              className={cn(
                                "truncate max-w-44",
                                enrollment.status ===
                                  ClassEnrollmentStatus.CANCELED &&
                                  "line-through	"
                              )}
                            >{`${enrollment.athlete.firstName} ${enrollment.athlete.lastName}`}</span>
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {canCheckIn && (
                              <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="xs"
                                      onClick={() =>
                                        checkInMutation(enrollment.id)
                                      }
                                      disabled={isCheckInLoading}
                                    >
                                      {/* <MapPin className="w-3.5" /> */}IN
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Check-in</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {canCheckIn && (
                              <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="xs"
                                      variant="outline"
                                      onClick={() =>
                                        handleStatusChange(
                                          enrollment.id,
                                          AttendanceStatus.MISSED
                                        )
                                      }
                                    >
                                      {/* <MapPinOff className="w-3.5" /> */}
                                      NO SHOW
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>No Show</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {canCheckOut && (
                              <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="xs"
                                      onClick={() =>
                                        cancelCheckIn(enrollment.id)
                                      }
                                      disabled={
                                        cancelCheckInLoading ||
                                        enrollment.status ===
                                          ClassEnrollmentStatus.CANCELED
                                      }
                                    >
                                      <XIcon className="w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Cancel Check-in</p>
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
                                      disabled={
                                        cancelCheckInLoading ||
                                        enrollment.status ===
                                          ClassEnrollmentStatus.CANCELED
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

        {sortedEnrollments.length > 0 && activeTab === "ENROLLED" && (
          <ScrollArea className="h-fit ">
            <div className="w-full overflow-auto">
              <Table>
                <TableBody>
                  <h3 className="mt-6 mb-2 font-semibold">Waitlist</h3>
                  {enrollments
                    .filter(
                      (enrollment) =>
                        enrollment.status === ClassEnrollmentStatus.WAITLISTED
                    )
                    .map((enrollment) => {
                      const isLoggedUser =
                        user?.athlete?.id === enrollment.athleteId;

                      const canCancel =
                        isAdmin ||
                        (isLoggedUser &&
                          enrollment.status ===
                            ClassEnrollmentStatus.WAITLISTED);

                      return (
                        <>
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
                                <span
                                  className={cn(
                                    "truncate max-w-44",
                                    enrollment.status ===
                                      ClassEnrollmentStatus.CANCELED &&
                                      "line-through"
                                  )}
                                >{`${enrollment.athlete.firstName} ${enrollment.athlete.lastName}`}</span>
                              </div>
                            </TableCell>

                            {/* Actions */}
                            <TableCell>
                              <div className="flex items-center gap-2">
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
                                          disabled={
                                            cancelCheckInLoading ||
                                            enrollment.status ===
                                              ClassEnrollmentStatus.CANCELED
                                          }
                                        >
                                          <XIcon className="w-3.5" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Leave Waitlist</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
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
