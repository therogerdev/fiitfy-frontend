import { useAuth } from "@/hooks/useAuth";
import { useCancelCheckIn } from "@/hooks/useCancelCheckIn";
import { useCancelEnrollment } from "@/hooks/useCancelEnrollment";
import { useCheckIn } from "@/hooks/useCheckIn";
import { getInitials } from "@/lib/utils";
import { ClassEnrollment, ClassEnrollmentStatus, Role } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

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

  const isAdmin = user?.role === Role.ADMIN;

  // Sort enrollments by status and createdAt
  const sortedEnrollments = enrollments.sort((a, b) => {
    const statusOrder = ["ENROLLED", "WAITLISTED", "CANCELED"];

    const getStatusIndex = (status?: ClassEnrollmentStatus) =>
      status ? statusOrder.indexOf(status) : -1; // Treat undefined status as lowest priority

    if (a.status === b.status) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return getStatusIndex(a.status) - getStatusIndex(b.status);
  });

  return (
    <ScrollArea className="mt-2 rounded-md max-h-60">
      <div className="grid grid-cols-1 gap-2 px-4">
        {sortedEnrollments.length === 0 ? (
          <Label>No enrollments for this class</Label>
        ) : (
          sortedEnrollments.map((enrollment) => {
            const isLoggedUser = user?.athlete?.id === enrollment.athleteId;

            // Check-in/Check-out Logic
            const canCheckIn =
              !enrollment.isCheckedIn &&
              enrollment.status === ClassEnrollmentStatus.ENROLLED &&
              (isLoggedUser || isAdmin);

            const canCheckOut =
              enrollment.isCheckedIn && (isLoggedUser || isAdmin);

            // Cancel Enrollment Logic
            const canCancel =
              isAdmin ||
              (isLoggedUser &&
                enrollment.status === ClassEnrollmentStatus.ENROLLED);

            return (
              <div
                key={enrollment.id}
                className="grid grid-cols-5 p-0 mt-0 border-b"
              >
                {/* Athlete Details */}
                <div className="flex items-center justify-start col-span-2 text-sm gap-x-2">
                  <Avatar>
                    <AvatarImage src="" alt={enrollment.athlete.firstName} />
                    <AvatarFallback className="flex items-center justify-center w-10 rounded-full bg-slate-100">
                      {getInitials(
                        enrollment.athlete.firstName,
                        enrollment.athlete.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold">
                    {`${enrollment.athlete.firstName} ${enrollment.athlete.lastName}`}
                  </p>
                </div>

                {/* Enrollment Status */}
                <div className="text-sm">
                  <Badge
                    variant={
                      enrollment.status === "WAITLISTED"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {enrollment.status}
                  </Badge>
                </div>

                {/* Check-In/Check-Out */}
                <div className="text-sm">
                  {canCheckIn && (
                    <Button
                      size="xs"
                      onClick={() => checkInMutation(enrollment.id)}
                      disabled={isCheckInLoading}
                    >
                      Check-in
                    </Button>
                  )}
                  {canCheckOut && (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => cancelCheckIn(enrollment.id)}
                      disabled={cancelCheckInLoading}
                    >
                      Check-out
                    </Button>
                  )}
                  {!canCheckIn && !canCheckOut && (
                    <div className="flex justify-center max-w-20">--</div>
                  )}
                </div>

                {/* Cancel Enrollment */}
                <div>
                  {canCancel ? (
                    <Button
                      size="xs"
                      variant="destructive"
                      onClick={() => cancelEnrollment(enrollment.id)}
                    >
                      {isAdmin ? "Admin Cancel" : "Cancel Enrollment"}
                    </Button>
                  ) : (
                    <div className="flex justify-center max-w-20">--</div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
};

export default ClassEnrollmentList;
