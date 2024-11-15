import CalendarDateSelector from "@/components/Class/CalendarDateSelector";
import ClassList from "@/components/Class/ClassList";
import ClassPageSkeleton from "@/components/Class/ClassPageSkeleton";
import ContentLayout from "@/components/layouts/content-layout";
import BreadcrumbComponent from "@/components/ui/BreadcrumbsComponent";
import { Button } from "@/components/ui/button";
import { appLink } from "@/config/links";
import { useAuth } from "@/hooks/useAuth";
import { useFetchClasses } from "@/hooks/useFetchClasses";
import { selectedDateAtom } from "@/store/class";
import { Role } from "@/types/user";
import { useAtomValue } from "jotai";
import { PlusCircle } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const breadcrumbLinks = [appLink.classes("All Classes")];

const ClassPage = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();
  const selectedDate = useAtomValue(selectedDateAtom);
  const {
    classes: allClasses,
    isLoading,
    error,
  } = useFetchClasses({ selectedDate });

  if (isLoading) return <ClassPageSkeleton />;
  if (error) return <ClassPageSkeleton error={error.response?.data.error} />;

  return (
    <ContentLayout
      breadcrumbs={<BreadcrumbComponent links={breadcrumbLinks} />}
      header={
        <>
          {isAuthorized(Role.ADMIN) ? (
            <Button
              onClick={() => navigate(appLink.createClass.href)}
              size="sm"
              className="gap-1 h-7"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {appLink.createClass.label}
              </span>
            </Button>
          ) : (
            <></>
          )}
        </>
      }
    >
      <div className="min-h-full px-6">
        <CalendarDateSelector />
        <ClassList classes={allClasses.map((item) => item) || []} />
      </div>
      {/* <ClassList /> */}

      <Outlet />
    </ContentLayout>
  );
};

export default ClassPage;
