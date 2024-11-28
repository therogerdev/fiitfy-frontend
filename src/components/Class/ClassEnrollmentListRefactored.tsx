import {
  AttendanceStatus,
  ClassEnrollment,
  ClassEnrollmentStatus,
} from "@/types";
import { atom, useAtomValue } from "jotai";
import React, { useState } from "react";
import AddPerformance from "../Performance/AddPerformance";
import { Label } from "../ui/label";
import ClassTabEnrollmentStatus from "./ClassTabEnrollmentStatus";
import EnrollmentTable from "./EnrollmentTable";

interface EnrollmentListProps {
  enrollments: ClassEnrollment[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const openPerformanceModal = atom(false);
// eslint-disable-next-line react-refresh/only-export-components
export const addPerformanceSelectedAtom = atom<string | null>(null);

const ClassEnrollmentListRefactored: React.FC<EnrollmentListProps> = ({
  enrollments,
}) => {
  const openAddPerformance = useAtomValue(openPerformanceModal);
  const selectedAthlete = useAtomValue(addPerformanceSelectedAtom);

  const [activeTab, setActiveTab] = useState<
    AttendanceStatus | ClassEnrollmentStatus
  >(ClassEnrollmentStatus.ENROLLED);

  // Filter enrollments based on the active tab
  const filteredEnrollments = enrollments.filter((enrollment) => {
    if (
      Object.values(ClassEnrollmentStatus).includes(
        activeTab as ClassEnrollmentStatus
      )
    ) {
      return enrollment.status === activeTab;
    }

    if (
      Object.values(AttendanceStatus).includes(activeTab as AttendanceStatus)
    ) {
      return enrollment.attendanceStatus === activeTab;
    }

    return false;
  });

  // sort by status
  const sortedEnrollments = filteredEnrollments.sort((a, b) => {
    const statusOrder = [
      ClassEnrollmentStatus.ENROLLED,
      ClassEnrollmentStatus.WAITLISTED,
      ClassEnrollmentStatus.CANCELED,
    ];
    const getStatusIndex = (status?: ClassEnrollmentStatus) =>
      status ? statusOrder.indexOf(status) : -1;

    if (a.status === b.status) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return getStatusIndex(a.status) - getStatusIndex(b.status);
  });

  // Waitlist
  const waitlistEnrollments = enrollments.filter(
    (enroll) => enroll.status === ClassEnrollmentStatus.WAITLISTED
  );

  return (
    <div className="flex flex-col ">
      <ClassTabEnrollmentStatus
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <EnrollmentTable enrollments={sortedEnrollments} />
        {activeTab === ClassEnrollmentStatus.ENROLLED &&
          waitlistEnrollments.length > 0 && (
            <>
              <Label className="mt-6 mb-2 font-semibold">Waitlist</Label>
              <EnrollmentTable enrollments={waitlistEnrollments} />
            </>
          )}
      </ClassTabEnrollmentStatus>
      {openAddPerformance && <AddPerformance athleteId={selectedAthlete as string} />}
    </div>
  );
};

export default ClassEnrollmentListRefactored;
