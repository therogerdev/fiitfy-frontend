import EnrollLoggedUser from "@/auth/EnrollLoggedUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiClient } from "@/config/axios.config";
import { useAuth } from "@/hooks/useAuth";
import { ClassEnrollmentResponse, Role } from "@/types";
import { EndpointType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PlusCircle } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { ClassEnrollAthlete } from "./ClassEnrollAthlete";
import ClassEnrollmentList from "./ClassEnrollmentList";
interface ClassEnrollmentsProps {
  classId: string;
  capacity?: number;
}

const fetchEnrollment = async ({
  classId,
  status,
}: {
  classId: string;
  status?: string;
}): Promise<ClassEnrollmentResponse> => {
  const response = await apiClient.get(
    `${EndpointType.Enroll}/${classId}/list?status_not=${status?.toUpperCase()}`
  );
  return response.data;
};

export const ClassEnrollments: React.FC<ClassEnrollmentsProps> = ({
  classId,
  capacity,
}) => {
  const { user, isAuthorized } = useAuth();

  const {
    data: enrollment,
    error,
    isLoading,
  } = useQuery<ClassEnrollmentResponse, AxiosError>({
    queryKey: ["enrollment", classId],
    queryFn: () => fetchEnrollment({ classId, status: "canceled" }),
    enabled: !!classId,
  });

  const userEnrollment = useMemo(
    () =>
      enrollment?.data?.find((item) => item.athleteId === user?.athlete?.id),
    [enrollment, user]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Something went wrong!</div>;

  return (
    <Card className="mt-2">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle>Enrollments</CardTitle>
          <CardDescription>
            {capacity === 0 ? "Class is Full" : `${capacity} spots left`}
          </CardDescription>
        </div>
        <div>
          {isAuthorized([Role.ADMIN, Role.COACH]) && (
            <ClassEnrollAthlete classId={classId}>
              <Button size="sm" className="gap-1 mx-1 h-7">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {capacity === 0 ? "Join Waitlist" : "Enroll Athlete"}
                </span>
              </Button>
            </ClassEnrollAthlete>
          )}
          {isAuthorized([Role.MEMBER]) && !userEnrollment && (
            <EnrollLoggedUser classId={classId} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {(enrollment?.data?.length || 0) > 0 && (
          <>
            <div className="grid grid-cols-5 p-0 mb-1 italic font-semibold">
              <div className="col-span-2 ml-10">Athlete</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Check-in</div>
              <div className="col-span-1">Cancel</div>
            </div>
            <Separator />
          </>
        )}
        <ScrollArea className="mt-1 rounded-md max-h-60">
          <div className="grid grid-cols-1 gap-2 pxß-4">
            {enrollment?.data?.length === 0 ? (
              <Label>No enrollments for this class</Label>
            ) : (
              <ClassEnrollmentList
                classId={classId}
                enrollments={enrollment?.data || []}
              />
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// interface EnrollButtonProps {
//   classId: string;
//   athleteId: string;
// }

// const EnrollButton: React.FC<EnrollButtonProps> = ({ classId, athleteId }) => {
//   const { toast } = useToast();

//   const enrollMutation = useMutation<
//     ClassEnrollmentResponse,
//     AxiosError<ClientError>,
//     { classId: string; athleteId: string }
//   >({
//     mutationFn: async ({ classId, athleteId }) => {
//       const response = await apiClient.post<ClassEnrollmentResponse>(
//         `${EndpointType.Enroll}/${classId}/enroll`,
//         { athleteId }
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       toast({
//         title: "Enrollment Successful",
//         description: "Athlete has been successfully enrolled in the class.",
//         variant: "default",
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["class-detail", classId],
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Enrollment Failed",
//         description:
//           error?.response?.data?.error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//     },
//   });

//   const handleEnroll = () => {
//     enrollMutation.mutate({ classId, athleteId });
//   };

//   return (
//     <Button
//       size="sm"
//       onClick={handleEnroll}
//       disabled={enrollMutation.isPending}
//     >
//       <PlusCircleIcon className=" w-3.5 mr-1" />
//       {enrollMutation.isPending ? "Enrolling..." : "Enroll Athlete"}
//     </Button>
//   );
// };

// export const ClassEnrollments: React.FC<ClassEnrollmentsProps> = ({
//   classId,
//   capacity,
// }) => {
//   const { toast } = useToast();
//   const { user } = useAuth();
//   const {
//     data: enrollment,
//     error,
//     isLoading,
//   } = useQuery<ClassEnrollmentResponse, AxiosError>({
//     queryKey: ["enrollment", classId],
//     queryFn: () => fetchEnrollment({ classId: classId, status: "canceled" }),
//     enabled: !!classId,
//   });

//   const { isAuthorized } = useAuth();

//   const { mutate: checkInMutation, isPending } = useCheckIn();

//   // Mutation to cancel enrollment
//   const cancelEnrollmentMutation = useMutation<
//     void,
//     AxiosError<ClientError>,
//     string
//   >({
//     mutationFn: async (enrollmentId: string) => {
//       await apiClient.patch(`${EndpointType.Enroll}/${enrollmentId}/cancel`, {
//         classId,
//       });
//     },
//     onSuccess: () => {
//       toast({
//         title: "Enrollment canceled successfully",
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["enrollment"],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["class-detail", classId],
//       });
//     },
//     onError: (error) => {
//       const errorMessage =
//         error?.response?.data?.error || "Failed to cancel enrollment";
//       toast({
//         title: "Error",
//         description: errorMessage as string,
//         variant: "destructive",
//       });
//     },
//   });

//   // Handle cancel button click
//   const handleCancel = (enrollmentId: string) => {
//     cancelEnrollmentMutation.mutate(enrollmentId);
//   };

//   // Function to check if user.athlete.id is on the enrollment list
//   const isUserEnrolled = (userId: string) => {
//     return enrollment?.data?.some(
//       (enrollmentItem) => enrollmentItem.athleteId === userId
//     );
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
//   const userEnrollment = isUserEnrolled(user?.athlete?.id || "");

//   return (
//     <Card className="mt-2">
//       <CardHeader>
//         <div className="flex justify-between">
//           <div>
//             <CardTitle>Enrollments</CardTitle>
//             {capacity === 0 ? (
//               <CardDescription>
//                 <Badge className="mt-1" variant={"destructive"}>
//                   Class is Full
//                 </Badge>
//               </CardDescription>
//             ) : (
//               <CardDescription>{capacity} spots left </CardDescription>
//             )}
//           </div>
//           {isAuthorized([Role.ADMIN, Role.COACH]) && (
//             <ClassEnrollAthlete classId={classId}>
//               <Button size="sm" className="gap-1 h-7">
//                 <PlusCircle className="h-3.5 w-3.5" />
//                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                   {capacity === 0 ? "Join Waitlist" : "Enroll Athlete"}
//                 </span>
//               </Button>
//             </ClassEnrollAthlete>
//           )}
//           {isAuthorized([Role.MEMBER]) &&
//             !isUserEnrolled(user?.athlete?.id as string) && (
//               <EnrollLoggedUser classId={classId} />
//             )}
//         </div>
//       </CardHeader>
//       <CardContent className="grid gap-6">
//         {(enrollment?.data?.length || 0) > 0 && (
//           <div className="grid grid-cols-5 p-0 italic font-semibold">
//             <div className="col-span-2 ml-10">Athlete</div>
//             <div className="col-span-1">Status</div>
//             <div className="col-span-1">Check-in</div>
//             <div className="col-span-1">Cancel</div>
//           </div>
//         )}
//         <Separator />
//         <ScrollArea className="mt-0 rounded-md max-h-48">
//           <div className="grid grid-cols-1 gap-2 p-4">
//             {(enrollment?.data?.length || 0) === 0 && (
//               <Label>No enrollment for this class</Label>
//             )}
//             {(enrollment?.data || []).map((enrollmentItem) => (
//               <div
//                 key={enrollmentItem.id}
//                 className="grid grid-cols-5 p-0 mt-0 border-b"
//               >
//                 <div className="flex items-center justify-start col-span-2 text-sm gap-x-2">
//                   <Avatar>
//                     <AvatarImage
//                       src=""
//                       alt={enrollmentItem.athlete.firstName}
//                     />
//                     <AvatarFallback className="flex items-center justify-center w-10 rounded-full bg-slate-100">
//                       {getInitials(
//                         enrollmentItem.athlete.firstName,
//                         enrollmentItem.athlete.lastName
//                       )}
//                     </AvatarFallback>
//                   </Avatar>
//                   <p className="text-sm font-semibold">
//                     {`${enrollmentItem.athlete.firstName} ${enrollmentItem.athlete.lastName}`}
//                   </p>
//                 </div>
//                 <div className="text-sm">
//                   <Badge
//                     variant={
//                       enrollmentItem.status === ClassEnrollmentStatus.WAITLISTED
//                         ? "default"
//                         : "secondary"
//                     }
//                   >
//                     {enrollmentItem.status}
//                   </Badge>
//                 </div>
//                 <div className="text-sm">
//                   {enrollmentItem.isCheckedIn ? (
//                     <Badge className="bg-green-700">Checked-in</Badge>
//                   ) : user?.athlete?.id === enrollmentItem.athleteId ||
//                     user?.role === "ADMIN" ? (
//                     <Button
//                       size="sm"
//                       onClick={() => checkInMutation(enrollmentItem.id)}
//                       disabled={isPending}
//                     >
//                       Check-in
//                     </Button>
//                   ) : null}
//                 </div>
//                 <div className="col-span-1">
//                   {
//                     userEnrollment &&
//                     user?.athlete?.id === enrollmentItem.athleteId ? (
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleCancel(enrollmentItem.id)}
//                         disabled={cancelEnrollmentMutation.isPending}
//                       >
//                         Cancel
//                       </Button>
//                     ) : user?.role === Role.ADMIN ? ( // Admin-specific functionality
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleCancel(enrollmentItem.id)}
//                         disabled={cancelEnrollmentMutation.isPending}
//                       >
//                         Admin Cancel
//                       </Button>
//                     ) : null // Show nothing for non-enrolled users
//                   }
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };
