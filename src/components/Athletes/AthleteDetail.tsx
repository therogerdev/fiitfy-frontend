import { apiClient } from "@/config/axios.config";
import { appLink } from "@/config/links";
import { Athlete } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Outlet, useParams } from "react-router";
import ContentLayout from "../layouts/content-layout";
import BreadcrumbComponent from "../ui/BreadcrumbsComponent";
import Spinner from "../ui/spinner";

import AthleteDetailAttendanceSummary from "./AthleteDetailAttendanceSummary";
import AthleteDetailClasses from "./AthleteDetailClasses";
import { AthleteDetailInformation } from "./AthleteDetailInformation";
import AthleteDetailSummaryCard from "./AthleteDetailSummaryCard";
import AthleteDetailUpcoming from "./AthleteDetailUpcoming";
import AthleteMembership from "./AthleteMembership";

const fetchAthleteById = async (id: string) => {
  const { data } = await apiClient.get<Athlete>(`/athlete/${id}`);
  return data;
};

const AthleteDetailPage = () => {
  const { id } = useParams();

  const {
    data: athlete,
    error,
    isLoading,
  } = useQuery<Athlete, AxiosError>({
    queryKey: ["athlete", id],
    queryFn: () => fetchAthleteById(id || ""),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner size="md" />;
      </div>
    );

  if (error) {
    return <p className="font-bold text-red-600">Something went wrong</p>;
  }

  return (
    <ContentLayout className="">
      <BreadcrumbComponent
        links={[
          appLink.athletes("All Athletes"),
          appLink.athleteDetail(athlete?.id as string),
        ]}
      />

      <main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
          <AthleteDetailInformation athlete={athlete} />

          {/* Membership */}
          <AthleteMembership id={id as string} athlete={athlete} />
          {/* Membership */}

          <AthleteDetailUpcoming athleteId={athlete?.id || ""} />
          <AthleteDetailAttendanceSummary />
        </div>
        <div className="grid flex-grow md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <AthleteDetailClasses athleteId={athlete?.id} />
          <AthleteDetailSummaryCard />
        </div>
      </main>
      <Outlet />
    </ContentLayout>
  );
};

export default AthleteDetailPage;
