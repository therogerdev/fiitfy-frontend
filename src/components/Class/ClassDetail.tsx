import { apiClient } from "@/config/axios.config";
import { selectedAthleteIdAtom } from "@/store/class";
import { EndpointType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Modal from "../ui/modal";
import { ClassEnrollments } from "./ClassEnrollments";
import { ClassInfo } from "./ClassInfo";
import { queryClient } from "@/config/queryClient";

const fetchClassDetail = async (id: string) => {
  const response = await apiClient.get(`${EndpointType.Class}/${id}`);

  return response.data;
};

const ClassDetail = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true); // Start open if you want
  const navigate = useNavigate();

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

  // handle close modal
  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      queryClient.invalidateQueries({
        queryKey: ["classList"],
      });
      navigate(-1); // Go back when the dialog closes
    }
  };

  return (
    <Modal
      size="lg"
      title={classDetail.data.name}
      description=""
      open={isOpen}
      onOpenChange={handleDialogChange}
      onClose={() => {
        setIsOpen(!open);
        navigate(-1);
        queryClient.invalidateQueries({
          queryKey: ["classList"],
        });
      }}
    >
      <ClassInfo
        id={classDetail.data.id}
        className={classDetail.data.name}
        description={classDetail.data.description}
        date={classDetail.data.date}
        time={classDetail.data.time}
        duration={classDetail.data.duration}
        coachId={classDetail.data.coachId}
      />

      <ClassEnrollments
        classId={classDetail.data.id}
        capacity={
          classDetail.data.capacity - classDetail.data.activeEnrollments
        }
      />
    </Modal>
  );
};

export default ClassDetail;
