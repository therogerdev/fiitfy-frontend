import { Workout } from "@/types";
import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";

interface ClassDetailWodTypes {
  workouts: Workout[];
}

const ClassDetailWod: FC<ClassDetailWodTypes> = ({ workouts }) => {
  const [workoutList, setWorkoutList] = useState(workouts);
  console.log("workouts", workouts);
  return (
    <div className="flex-1 h-full bg-white">
      <Card className="border-none rounded-none">
        <CardHeader>
          <CardTitle>Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <Reorder.Group
            axis="y"
            values={workoutList}
            onReorder={setWorkoutList}
            className="space-y-4"
          >
            {workoutList.map((workout) => {
              return (
                <Reorder.Item
                  key={workout.id}
                  value={workout}
                  className="p-4 rounded-lg shadow-sm cursor-pointer bg-gray-50"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold">
                        {workout.title}
                      </Label>
                      <div className="flex ml-2 gap-x-2">
                        <Label className="text-sm text-gray-500">
                          Sets: 
                        </Label>
                        <Label className="text-sm text-gray-500">
                          Time: {workout.duration} min
                        </Label>
                      </div>
                    </div>

                    <Reorder.Group
                      axis="y"
                      values={workout.movements}
                      onReorder={(newMovements) =>
                        setWorkoutList((prev) =>
                          prev.map((w) =>
                            w.id === workout.id
                              ? { ...w, movements: newMovements }
                              : w
                          )
                        )
                      }
                      className="mt-4 space-y-2"
                    >
                      {workout.movements?.map((movement) => (
                        <Reorder.Item
                          key={movement.id}
                          value={movement}
                          className="flex items-center p-2 bg-gray-100 rounded-lg shadow-sm"
                        >
                          <GripVertical className="w-4 h-4 mr-2 text-gray-400 cursor-grab" />
                          <div className="flex gap-x-2">
                            <Label className="text-sm text-gray-500">
                              {movement?.reps}{movement?.weightUnit}
                            </Label>
                            <Label className="text-sm font-bold">
                            {movement.movement.name}
                            </Label>
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassDetailWod;
