import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";
import {
  ClassEnrollmentResponse,
  ClassEnrollmentStatus,
  ClientError,
} from "@/types";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PlusCircle } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { apiClient } from "@/config/axios.config";
import { EndpointType } from "@/types/api";
import { ClassEnrollAthlete } from "./ClassEnrollAthlete";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/config/queryClient";

interface ClassEnrollmentsProps {
  classId: string;
  capacity?: number;
}
// Define a type for the fetch function's parameters
interface FetchEnrollmentParams {
  classId: string;
  status?: string;
}

// Fetch enrollment data based on class ID and optional status
const fetchEnrollment = async ({
  classId,
  status,
}: FetchEnrollmentParams): Promise<ClassEnrollmentResponse> => {
  const response = await apiClient.get(
    `${EndpointType.Enroll}/${classId}/list?status_not=${status?.toUpperCase()}`
  );
  return response.data;
};

export const ClassEnrollments: React.FC<ClassEnrollmentsProps> = ({
  classId,
  capacity,
}) => {
  const { toast } = useToast();
  const {
    data: enrollment,
    error,
    isLoading,
  } = useQuery<ClassEnrollmentResponse, AxiosError>({
    queryKey: ["enrollment", classId],
    queryFn: () => fetchEnrollment({ classId: classId, status: "canceled" }),
    enabled: !!classId,
  });

  // Mutation to cancel enrollment
  const cancelEnrollmentMutation = useMutation<
    void,
    AxiosError<ClientError>,
    string
  >({
    mutationFn: async (enrollmentId: string) => {
      await apiClient.patch(`${EndpointType.Enroll}/${enrollmentId}/cancel`, {
        classId,
      });
    },
    onSuccess: () => {
      toast({
        title: "Enrollment canceled successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["enrollment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["class", classId],
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || "Failed to cancel enrollment";
      toast({
        title: "Error",
        description: errorMessage as string,
        variant: "destructive",
      });
    },
  });

  // Handle cancel button click
  const handleCancel = (enrollmentId: string) => {
    cancelEnrollmentMutation.mutate(enrollmentId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Enrollments</CardTitle>
            <CardDescription>{capacity} spots left</CardDescription>
          </div>
          <ClassEnrollAthlete classId={classId}>
            <Button size="sm" className="gap-1 h-7">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Enroll Athlete
              </span>
            </Button>
          </ClassEnrollAthlete>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {(enrollment?.data?.length || 0) > 0 && (
          <div className="grid grid-cols-5 p-0 italic font-semibold">
            <div className="col-span-2 ml-10">Athlete</div>
            <div className="col-span-1">Enrollment</div>
            <div className="col-span-1">Check-in</div>
            <div className="col-span-1">Cancel</div>
          </div>
        )}
        <Separator />
        <ScrollArea className="mt-0 rounded-md max-h-48">
          <div className="grid grid-cols-1 gap-2 p-4">
            {(enrollment?.data?.length || 0) === 0 && (
              <Label>No enrollment for this class</Label>
            )}
            {(enrollment?.data || []).map((enrollmentItem) => (
              <div
                key={enrollmentItem.id}
                className="grid grid-cols-5 p-0 mt-0 border-b"
              >
                <div className="flex items-center justify-start col-span-2 text-sm gap-x-2">
                  <Avatar>
                    <AvatarImage
                      src=""
                      alt={enrollmentItem.athlete.firstName}
                    />
                    <AvatarFallback className="flex items-center justify-center w-10 rounded-full bg-slate-100">
                      {getInitials(
                        enrollmentItem.athlete.firstName,
                        enrollmentItem.athlete.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold">
                    {`${enrollmentItem.athlete.firstName} ${enrollmentItem.athlete.lastName}`}
                  </p>
                </div>
                <div className="text-sm">
                  <Badge
                    variant={
                      enrollmentItem.status === ClassEnrollmentStatus.WAITLISTED
                        ? "default"
                        : "secondary"
                    }
                  >
                    {enrollmentItem.status}
                  </Badge>
                </div>
                <div className="text-sm">
                  {enrollmentItem.isCheckedIn ? (
                    <Badge variant="destructive" className="cursor-pointer">
                      Check-out
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="cursor-pointer">
                      Check-in
                    </Badge>
                  )}
                </div>
                <div className="col-span-1">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleCancel(enrollmentItem.id)}
                    disabled={cancelEnrollmentMutation.isPending}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
