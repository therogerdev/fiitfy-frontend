import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useWorkoutList } from "@/hooks/useListWorkouts";
import { Badge } from "@ui/badge";

import { DropdownMenuItem } from "@ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@ui/table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Fragment } from "react";

const WorkoutList = () => {
  const { workouts, error, isLoading, pagination } = useWorkoutList();

  if (isLoading) {
    return <p>Loading workout...</p>;
  }

  if (error) {
    return <p>Failed to load workouts. Please try again later.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workouts</CardTitle>
        <CardDescription>
          Manage your workouts and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Intensity</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts?.data.map((workout) => (
              <Fragment key={workout.id}>
                <TableRow>
                  <TableCell className="font-medium">{workout.title}</TableCell>
                  <TableCell className="max-w-[400px] truncate">
                    {workout.type}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{workout.intensity}</Badge>
                  </TableCell>
                  <TableCell>{workout.duration} min</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {workout.description || "--"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(workout.createdAt), "PP")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <strong>
            1-
            {pagination && pagination?.totalCount < pagination?.rowsPerPage
              ? pagination.totalCount
              : pagination?.rowsPerPage}
          </strong>{" "}
          of <strong>{pagination?.totalCount}</strong> workouts
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutList;
