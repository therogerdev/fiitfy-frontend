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
    `${EndpointType.Enroll}/${classId}/list?status_not=${
      status?.toUpperCase() || ""
    }`
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
    queryFn: () => fetchEnrollment({ classId }),
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
    <Card className="h-full border-none rounded-none">
      {" "}
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle>Who's in?</CardTitle>
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
        {enrollment?.data?.length === 0 ? (
          <Label>No enrollments for this class</Label>
        ) : (
          <ClassEnrollmentList enrollments={enrollment?.data || []} />
        )}
      </CardContent>
    </Card>
  );
};
