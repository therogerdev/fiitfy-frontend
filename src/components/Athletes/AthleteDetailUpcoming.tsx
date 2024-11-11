import { apiClient } from "@/config/axios.config";
import { ClientError } from "@/types";
import { EndpointType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format, isToday, isTomorrow } from "date-fns";
import { Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AthleteDetailCardLoading } from "./AthleteDetailCardLoading";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

type ClassInfo = {
  id: string;
  name: string;
  date: Date;
};

type ClassInfoResponse = {
  data: ClassInfo[];
};

const fetchUpcomingClasses = async (athleteId: string) => {
  const response = await apiClient.get(
    `${EndpointType.Athlete}/${athleteId}/upcoming-classes`
  );
  return response.data;
};

const AthleteDetailUpcoming = ({ athleteId }: { athleteId: string }) => {
  const navigate = useNavigate();
  const {
    data: upcoming,
    error,
    isLoading,
  } = useQuery<ClassInfoResponse, AxiosError<ClientError>>({
    queryKey: ["upcoming-classes"],
    queryFn: () => fetchUpcomingClasses(athleteId),
    enabled: !!athleteId,
  });

  if (isLoading) return <AthleteDetailCardLoading />;
  if (error)
    return (
      <AthleteDetailCardLoading
        title="Upcoming Classes"
        errorMessage={error.response?.data.error || ""}
      />
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
        <Timer className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {upcoming?.data && (
              <div className="grid items-center justify-between grid-cols-4 px-1 py-2 sm:px-0">
                <dd className="mt-1 font-semibold w-36 text-secondary-foreground text-sm/6 sm:col-span-1 sm:mt-0">
                  Date
                </dd>
                <dt className="self-start flex-grow col-span-2 mx-2 font-semibold truncate text-primary text-sm/6">
                  Class
                </dt>
                <dt className="self-start flex-grow mx-2 font-semibold truncate text-primary text-sm/6">
                  Time
                </dt>
              </div>
            )}

            {!upcoming?.data && (
              <div className="flex items-center justify-center h-full gap-x-2 min-h-32">
                <Button
                  onClick={() => navigate(`/${EndpointType.Class}`)}
                  variant={"outline"}
                >
                  Book a Class
                </Button>
              </div>
            )}

            {upcoming?.data?.map((classItem: ClassInfo) => {
              return (
                <div
                  key={classItem.id}
                  className="grid grid-cols-4 px-1 py-2 sm:px-0"
                >
                  <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-1 sm:mt-0">
                    {isToday(new Date(classItem.date))
                      ? "Today"
                      : isTomorrow(new Date(classItem.date))
                      ? "Tomorrow"
                      : format(new Date(classItem.date), "PP")}
                  </dd>
                  <dt className="col-span-2 truncate text-primary text-sm/6">
                    {classItem.name}
                  </dt>
                  <dt className="truncate text-primary text-sm/6">
                    {format(new Date(classItem.date), "p")}
                  </dt>
                </div>
              );
            })}
          </dl>
        </div>
      </CardContent>
    </Card>
  );
};

export default AthleteDetailUpcoming;
