

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AttendanceStatus,
    ClassEnrollmentStatus
} from "@/types";
import React from "react";
interface TabClassEnrollmentStatusProps {
    activeTab: AttendanceStatus | ClassEnrollmentStatus;
    setActiveTab: React.Dispatch<
      React.SetStateAction<AttendanceStatus | ClassEnrollmentStatus>
    >;
    children?: React.ReactNode;
  }
  

const ClassTabEnrollmentStatus: React.FC<TabClassEnrollmentStatusProps> = ({
    activeTab,
    setActiveTab,
    children,
  }) => {
    return (
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as AttendanceStatus | ClassEnrollmentStatus.ENROLLED)
        }
        className="w-full h-full overflow-hidden"
      >
        {/* Tabs for filtering */}
        <TabsList className="mb-4">
          <TabsTrigger value={ClassEnrollmentStatus.ENROLLED}>
            {ClassEnrollmentStatus.ENROLLED}
          </TabsTrigger>
          <TabsTrigger value={AttendanceStatus.ATTENDED}>
            {AttendanceStatus.ATTENDED}
          </TabsTrigger>
  
          <TabsTrigger value={AttendanceStatus.MISSED}>
            {AttendanceStatus.MISSED}
          </TabsTrigger>
  
          <TabsTrigger value={ClassEnrollmentStatus.CANCELED}>
            {ClassEnrollmentStatus.CANCELED}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>{children}</TabsContent>
      </Tabs>
    );
  };

  export default ClassTabEnrollmentStatus