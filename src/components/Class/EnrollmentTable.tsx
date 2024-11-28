import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClassEnrollment } from "@/types";
import EnrollmentTableItem from "./EnrollmentTableItem";

const EnrollmentTable = ({
  enrollments,
}: {
  enrollments: ClassEnrollment[];
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Athlete</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map((enrollment) => {
            return <EnrollmentTableItem key={enrollment.id} enrollment={enrollment} />;
          })}
        </TableBody>
      </Table>
     
    </>
  );
};

export default EnrollmentTable;
