import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/config/axios.config";
import { appLink } from "@/config/links";
import {
  Class,
  ClassEnrollmentStatus,
  ClassResponse,
  ClientError,
} from "@/types";
import { EndpointType } from "@/types/api";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { Table } from "../ui/table";
import { AthleteDetailCardLoading } from "./AthleteDetailCardLoading";

const fetchAthleteClasses = async (athleteId: string) => {
  const response = await apiClient.get<ClassResponse>(
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
  } = useQuery<ClassResponse, AxiosError<ClientError>>({
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
  const bookedClasses = classes?.data.filter(
    (classInfo) => classInfo.status === "ENROLLED"
  );
  const attendedClasses = classes?.data.filter(
    (classInfo) => classInfo.status === "WAITLISTED"
  );
  const canceledClasses = classes?.data.filter(
    (classInfo) => classInfo.status === "CANCELED"
  );

  return (
    <Card className="xl:col-span-2">
      <Tabs defaultValue="booked">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Classes</CardTitle>
            <CardDescription>Recent classes member attended.</CardDescription>
          </div>
          <TabsList className="grid w-[300px] grid-cols-3">
            <TabsTrigger value="booked">Booked</TabsTrigger>
            <TabsTrigger value="attended">Attended</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="booked">
            <ScrollArea className="max-h-64">
              <AthleteClassesTable classes={bookedClasses} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="attended">
            <ScrollArea className="max-h-64">
              <AthleteClassesTable classes={attendedClasses || []} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="canceled">
            <ScrollArea className="max-h-64">
              <AthleteClassesTable classes={canceledClasses || []} />
            </ScrollArea>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default AthleteDetailClasses;

interface AthleteClassesTableProps {
  athleteId: string;
}

interface AthleteClassesTableProps {
  classes: Class[];
}



type ClassWithStatus = Class & {
  status: ClassEnrollmentStatus;
};


const AthleteClassesTable: React.FC = ({
  classes,
}) => {
  const navigate = useNavigate();
  return (
    <Table>
      <AthleteClassesTableHeader />

      <tbody className="bg-white">
        {classes?.map((classInfo: ClassWithStatus) => (
          <tr key={classInfo.id} className="border-t">
            <td className="px-4 py-2">
              <div className="flex items-center">
                <div>
                  <div className="font-medium">{`${classInfo.name}`}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2">
              {format(new Date(new Date(classInfo.date)), "PP")}
            </td>
            <td className="px-4 py-2">
              {format(new Date(new Date(classInfo.date)), "p")}
            </td>
            <td className="px-4 py-2">
              {/* <Badge
                variant={`${
                  classInfo.status === ClassEnrollmentStatus.CANCELED
                    ? "destructive"
                    : ""
                }`}
              >
                {classInfo.status}
              </Badge>{" "} */}

                <Badge variant={classInfo.status === ClassEnrollmentStatus.CANCELED ? "destructive" : "default"}>
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
    </Table>
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
