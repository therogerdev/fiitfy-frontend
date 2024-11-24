import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/config/axios.config";
import { appLink } from "@/config/links";
import { ClassEnrollmentStatus, ClientError } from "@/types";
import { EndpointType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AthleteDetailCardLoading } from "./AthleteDetailCardLoading";

export interface EnrollmentClasses {
  success: boolean;
  type: "class";
  total: number;
  data: {
    id: string;
    name: string;
    date: string;
    status: ClassEnrollmentStatus;
  }[];
  meta: {
    timestamp: string;
  };
}

const fetchAthleteClasses = async (athleteId: string) => {
  const response = await apiClient.get<EnrollmentClasses>(
    `${EndpointType.Enroll}/${athleteId}/classes`,
    {
      params: {
        athleteId: athleteId,
      },
    }
  );
  return response.data;
};

const AthleteDetailClasses = ({ athleteId }: { athleteId?: string }) => {
  const {
    data: classes,
    error,
    isLoading,
  } = useQuery<EnrollmentClasses, AxiosError<ClientError>>({
    queryKey: ["classes", athleteId],
    queryFn: () => fetchAthleteClasses(athleteId || ""),
    enabled: !!athleteId,
  });

  if (isLoading) {
    return <AthleteDetailCardLoading title="Class Information" />;
  }

  if (error) {
    return (
      <AthleteDetailCardLoading
        title="Class Information"
        errorMessage={error.response?.data.error || ""}
      />
    );
  }

  // Filter classes by status
  const bookedClasses = classes?.data.filter((classInfo) => {
    return classInfo.status === ClassEnrollmentStatus.ENROLLED;
  });
  const attendedClasses = classes?.data.filter(
    (classInfo) => classInfo.status === ClassEnrollmentStatus.WAITLISTED
  );
  const canceledClasses = classes?.data.filter(
    (classInfo) => classInfo.status === ClassEnrollmentStatus.CANCELED
  );

  return (
    <Card className="h-full col-span-2">
      <Tabs defaultValue="enrolled" className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Classes</CardTitle>
            <CardDescription>Recent classes member attended.</CardDescription>
          </div>
          <TabsList className="grid w-[300px] grid-cols-3">
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="attended">Attended</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="h-full overflow-hidden">
          <TabsContent value="enrolled" className="h-full">
            <AthleteClassesTable classes={bookedClasses || []} />
          </TabsContent>
          <TabsContent value="attended" className="h-full">
            <AthleteClassesTable classes={attendedClasses || []} />
          </TabsContent>
          <TabsContent value="canceled" className="h-full">
            <AthleteClassesTable classes={canceledClasses || []} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default AthleteDetailClasses;

interface AthleteClassesTableProps {
  classes: EnrollmentClasses["data"];
}

const AthleteClassesTable: React.FC<AthleteClassesTableProps> = ({
  classes,
}) => {
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-[300px]">
      <table className="w-full">
        <AthleteClassesTableHeader />
        <tbody>
          {classes?.map((classInfo) => (
            <tr key={classInfo.id} className="border-t">
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">{`${classInfo.name}`}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                {format(new Date(classInfo.date), "PP")}
              </td>
              <td className="px-4 py-2">
                {format(new Date(classInfo.date), "p")}
              </td>
              <td className="px-4 py-2">
                <Badge
                  variant={
                    classInfo.status === ClassEnrollmentStatus.CANCELED
                      ? "destructive"
                      : "default"
                  }
                >
                  {classInfo.status}
                </Badge>
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <Button
                    onClick={() =>
                      navigate(`${appLink.classDetail(classInfo.id, "").href}`)
                    }
                    size={"sm"}
                  >
                    <EyeIcon className="w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
};

const AthleteClassesTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="border-l border-r bg-gray-50">
        <th className="px-4 py-4 text-sm font-semibold text-left text-primary">
          Name
        </th>
        <th className="px-4 py-4 text-sm font-semibold text-left text-primary">
          Date
        </th>
        <th className="px-4 py-4 text-sm font-semibold text-left text-primary">
          Time
        </th>
        <th className="px-4 py-4 text-sm font-semibold text-left text-primary">
          Status
        </th>
        <th className="px-4 py-4 text-sm font-semibold text-left text-primary">
          Actions
        </th>
      </tr>
    </thead>
  );
};
