import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AthleteDetailAttendanceSummary = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          Attendance Summary
        </CardTitle>
        <Activity className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>Attendance Summary content here</CardContent>
    </Card>
  );
};

export default AthleteDetailAttendanceSummary;
