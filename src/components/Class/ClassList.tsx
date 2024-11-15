import ClassListItem from "@/components/Class/ClassListItem";
import { selectedDateAtom } from "@/store/class";
import { Class } from "@/types";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface ClassListViewProps {
  classes: Class[];
}

export const ClassList: React.FC<ClassListViewProps> = ({ classes }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const selectedDate = useAtomValue(selectedDateAtom);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedDate]);

  const classesByDate = classes.filter(
    (classItem) =>
      format(classItem.date || new Date(), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div ref={sectionRef} className="mt-4">
      {classesByDate.map((classInfo) => (
        <Link to={`/class/${classInfo.id}`} key={classInfo.id}>
          <ClassListItem classInfo={classInfo} />
        </Link>
      ))}
      {classesByDate.length === 0 && (
        <p className="text-gray-500">No classes available for this date.</p>
      )}
    </div>
  );
};

export default ClassList;
