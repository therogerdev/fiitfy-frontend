import { apiClient } from "@/config/axios.config";
import { selectedAthleteIdAtom } from "@/store/class";
import { EndpointType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router";
import Modal from "../ui/modal";
import { ClassDetailCoach } from "./ClassDetailCoach";
import { ClassEnrollments } from "./ClassEnrollments";
import { ClassInfo } from "./ClassInfo";
import ClassDetailWod from "./ClassDetailWod";
import { ScrollArea } from "../ui/scroll-area";

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
    <ClassDetailLayout>
      <div className="h-full border-l lg:col-span-3">
        <div className="h-full bg-white border">
          <ScrollArea className="">
            <ClassDetailCoach coachId={classDetail.data.coachId} />
            <div className="p-2">
              Top Performance! 
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="border-r lg:col-span-6">
        <div className="flex flex-col h-full">
          <ClassInfo
            id={classDetail.data.id}
            className={classDetail.data.name}
            description={classDetail.data.description}
            date={classDetail.data.date}
            time={classDetail.data.time}
            duration={classDetail.data.duration}
          />
          <ClassDetailWod />
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
  );
};

export default ClassDetail;

const ClassDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full col-span-1 overflow-hidden md:grid-cols-2 lg:grid-cols-12">
      {children}
    </div>
  );
};
