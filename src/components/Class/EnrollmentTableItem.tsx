import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { TableCell, TableRow } from "@/components/ui/table";
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
import {
  BicepsFlexed,
  CircleSlash2,
  MapPinCheckInside,
  XIcon,
} from "lucide-react";
import { useParams } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSetAtom } from "jotai";
import {
  addPerformanceSelectedAtom,
  openPerformanceModal,
} from "./ClassEnrollmentList";

const EnrollmentTableItem = ({
  enrollment,
}: {
  enrollment: ClassEnrollment;
}) => {
  const { id: classId } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === Role.ADMIN;
  const isLoggedUser = user?.athlete?.id === enrollment.athleteId;
  const { cancelCheckIn, cancelCheckInLoading } = useCancelCheckIn();
  const { mutate: cancelEnrollment } = useCancelEnrollment(classId as string);
  const { mutate: attendanceMutation } = useEnrollmentAttendance();
  const { mutate: checkInMutation, isPending: isCheckInLoading } = useCheckIn(
    classId as string
  );

  const setOpenPerformance = useSetAtom(openPerformanceModal);
  // select to add performance
  const setSelectAthlete = useSetAtom(addPerformanceSelectedAtom);

  const canCheckIn =
    !enrollment.isCheckedIn &&
    enrollment.status === ClassEnrollmentStatus.ENROLLED &&
    (isLoggedUser || isAdmin);

  const canCheckOut = enrollment.isCheckedIn && (isLoggedUser || isAdmin);

  const canCancel =
    isAdmin ||
    (isLoggedUser && enrollment.status === ClassEnrollmentStatus.ENROLLED);

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    attendanceMutation({ enrollmentId: id, status });
  };

  const handleAddPerformance = (athleteId: string) => {
    setSelectAthlete(athleteId);
    setOpenPerformance(true);
  };

  return (
    <TableRow key={enrollment.id}>
      {/* Athlete Info */}
      <TableCell className="p-0">
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
              enrollment.status === ClassEnrollmentStatus.CANCELED &&
                "line-through"
            )}
          >{`${enrollment.athlete.firstName} ${enrollment.athlete.lastName}`}</span>
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="p-0">
        <div className="flex items-center gap-2">
          {canCheckIn && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    size="xs"
                    onClick={() => checkInMutation(enrollment.id)}
                    disabled={isCheckInLoading}
                  >
                    <MapPinCheckInside className="w-3.5" />
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
                      handleStatusChange(enrollment.id, AttendanceStatus.MISSED)
                    }
                  >
                    <CircleSlash2 className="w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>No Show</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {canCheckOut && (
            <>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleAddPerformance(enrollment.athleteId)}
                      className="my-2"
                      variant={"outline"}
                      size={"xs"}
                    >
                      <BicepsFlexed className="w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Performance</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      size="xs"
                      onClick={() => cancelCheckIn(enrollment.id)}
                      disabled={
                        cancelCheckInLoading ||
                        enrollment.status === ClassEnrollmentStatus.CANCELED
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
            </>
          )}
          {canCancel && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    size="xs"
                    variant="destructive"
                    onClick={() => cancelEnrollment(enrollment.id)}
                    disabled={
                      cancelCheckInLoading ||
                      enrollment.status === ClassEnrollmentStatus.CANCELED
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
};

export default EnrollmentTableItem;
