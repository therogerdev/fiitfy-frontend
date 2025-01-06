import { fetchClassDetail } from "@/services/classes";
import { selectedAthleteIdAtom } from "@/store/class";
import { ClassDetailResponse, ClientError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router";
import { ClassDetailCoach } from "./ClassDetailCoach";
import { ClassDetailLayout } from "./ClassDetailLayout";
import ClassDetailLoading from "./ClassDetailLoading";
import ClassDetailWod from "./ClassDetailWod";
import { ClassEnrollments } from "./ClassEnrollments";
import { ClassInfo } from "./ClassInfo";
import ClassPerformance from "./ClassPerformance";

const ClassDetail = () => {
  const { id } = useParams();

  const {
    data: classDetail,
    error,
    isLoading,
  } = useQuery<ClassDetailResponse, AxiosError<ClientError>>({
    queryKey: ["class-detail", id],
    queryFn: () => fetchClassDetail(id as string),
    enabled: !!id,
  });

  const selectedAthleteId = useAtomValue(selectedAthleteIdAtom);

  useEffect(() => {}, [selectedAthleteId]);

  if (isLoading) {
    return <ClassDetailLoading />;
  }

  if (error) {
    return <div>{error.response?.data.error}</div>;
  }

  return (
    <ClassDetailLayout
      performance={
        <>
          <ClassDetailCoach coachId={classDetail?.data.coachId} />
          <ClassPerformance classId={classDetail?.data.id} />
        </>
      }
      enrollments={
        <>
          <ClassEnrollments
            classId={classDetail?.data?.id as string}
            capacity={
              Number(classDetail?.data?.capacity) -
              Number(classDetail?.data?.activeEnrollments)
            }
          />
        </>
      }
    >
      {classDetail?.data && (
        <ClassInfo
          id={classDetail.data.id}
          name={classDetail.data.name}
          description={classDetail.data.description || ""}
          date={classDetail.data.date}
          time={classDetail.data.date}
          duration={classDetail.data.duration}
        />
      )}
      <ClassDetailWod workouts={classDetail?.data?.workouts} />
    </ClassDetailLayout>
  );
};

export default ClassDetail;

