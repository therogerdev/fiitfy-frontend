import { Movement, Workout, WorkoutMovement } from "@/types";
import { Reorder } from "framer-motion";
import { atom, useSetAtom } from "jotai";
import { GripVertical } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

export const classMovementsListAtom = atom<ClassMovementsListType[] | null>(
  null
);

interface ClassDetailWodTypes {
  workouts?: Workout[];
}

export type ClassMovementsListType = {
  movementId: string;
  name: string;
  category: Movement["category"];
};

const getClassMovements = (workouts: Workout[]): ClassMovementsListType[] => {
  return workouts.reduce<ClassMovementsListType[]>((acc, workout) => {
    workout.movements.forEach((movement: WorkoutMovement) => {
      acc.push({
        movementId: movement.movement.id,
        name: movement.movement.name,
        category: movement.movement.category,
      });
    });
    return acc;
  }, []);
};

const ClassDetailWod: FC<ClassDetailWodTypes> = ({ workouts }) => {
  const [workoutList, setWorkoutList] = useState(workouts);
  const setMovements = useSetAtom(classMovementsListAtom);

  useEffect(() => {
    const allMovements = getClassMovements(workouts as Workout[]);
    setMovements(allMovements);
  }, [workouts, setMovements]);

  return (
    <div className="flex-1 h-full bg-white">
      <Card className="border-none rounded-none">
        <CardHeader>
          <CardTitle>Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <Reorder.Group
            axis="y"
            values={workoutList as Workout[]}
            onReorder={setWorkoutList}
            className="space-y-4"
          >
            {workoutList?.map((workout) => {
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
                          {workout.type}
                        </Label>
                      </div>
                      <div className="flex ml-2 gap-x-2">
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
                          prev?.map((w) =>
                            w.id === workout.id
                              ? { ...w, movements: newMovements }
                              : w
                          )
                        )
                      }
                      className="mt-4 space-y-2"
                    >
                      {workout.movements?.map((movement) => {
                        return (
                          <Reorder.Item
                            key={movement.id}
                            value={movement}
                            className="flex items-center p-2 rounded-lg shadow-sm"
                          >
                            <GripVertical className="w-4 h-4 mr-2 text-gray-400 cursor-grab" />
                            <div className="flex items-center justify-between w-full gap-x-4">
                              <div className="flex gap-x-2">
                                <Label className="text-sm text-gray-500">
                                  {movement?.reps}x
                                </Label>
                                <Label className="text-sm font-bold">
                                  {movement.movement.name}
                                </Label>
                                <Label className="text-sm text-gray-500">
                                  {movement.weight && "@"} {movement.weight}
                                </Label>
                              </div>

                              <p className="max-w-sm text-left truncate">
                                {movement.instructions}
                              </p>
                            </div>
                          </Reorder.Item>
                        );
                      })}
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
