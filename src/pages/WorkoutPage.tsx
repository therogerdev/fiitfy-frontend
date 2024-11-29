import ContentLayout from "@/components/layouts/content-layout";
import BreadcrumbComponent from "@/components/ui/BreadcrumbsComponent";
import WorkoutActions from "@/components/Workouts/WorkoutActions";

import WorkoutList from "@/components/Workouts/WorkoutList";
import { appLink } from "@/config/links";
import { Outlet } from "react-router";

const breadcrumbLinks = [appLink.workout];

const WorkoutPage = () => {
  return (
    <ContentLayout className="">
      <BreadcrumbComponent links={breadcrumbLinks} />
      <WorkoutActions />
      <WorkoutList />
      <Outlet />
    </ContentLayout>
  );
};

export default WorkoutPage;
