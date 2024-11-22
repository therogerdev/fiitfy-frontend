import { apiClient } from "@/config/axios.config";
import { selectedAthleteIdAtom } from "@/store/class";
import { EndpointType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Modal from "../ui/modal";
import { ClassEnrollments } from "./ClassEnrollments";
import { ClassInfo } from "./ClassInfo";
import { ClassDetailCoach } from "./ClassDetailCoach";

const fetchClassDetail = async (id: string) => {
  const response = await apiClient.get(`${EndpointType.Class}/${id}`);

  return response.data;
};

const ClassDetail = () => {
  const { id } = useParams();

  const {
    data: classDetail,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["class-detail", id],
    queryFn: () => fetchClassDetail(id as string),
    enabled: !!id,
  });

  const selectedAthleteId = useAtomValue(selectedAthleteIdAtom);

  useEffect(() => {}, [selectedAthleteId]);

  if (isLoading) {
    return <Modal size="lg">Loading...</Modal>;
  }

  if (error) {
    return <Modal size="lg">Error: {error.message}</Modal>;
  }

  return (
    <>
      <ClassDetailLayout>
        <div className="border-l lg:col-span-3 ">
          <ClassDetailCoach coachId={classDetail.data.coachId} />
        </div>
        <div className="flex flex-col border-l border-r md:col-span-2 lg:col-span-6">
          <ClassInfo
            id={classDetail.data.id}
            className={classDetail.data.name}
            description={classDetail.data.description}
            date={classDetail.data.date}
            time={classDetail.data.time}
            duration={classDetail.data.duration}
          />
          <div className="bg-white border-y">
            <Card className="border-none rounded-none">
              <CardHeader>
                <CardTitle>Workout</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
        <div className="overflow-hidden border-r md:col-span-2 lg:col-span-3">
          <ClassEnrollments
            classId={classDetail.data.id}
            capacity={
              classDetail.data.capacity - classDetail.data.activeEnrollments
            }
          />
        </div>
      </ClassDetailLayout>
    </>
  );
};

export default ClassDetail;

const ClassDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid col-span-1 md:grid-cols-2 lg:grid-cols-12">
      {children}
    </div>
  );
};
