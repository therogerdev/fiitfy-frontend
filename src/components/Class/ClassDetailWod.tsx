import { Workout } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { FC } from "react";

interface ClassDetailWodTypes {
  workout: Workout;
}

const ClassDetailWod: FC<ClassDetailWodTypes> = ({ workout }) => {
  return (
    <div className="flex-1 h-full bg-white">
      <Card className="border-none rounded-none">
        <CardHeader>
          <CardTitle>Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full">
            {workout?.id}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold">Warm Up</div>
                <div className="text-sm">{workout?.title}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold">Skills</div>
                <div className="text-sm">{workout?.intensity}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold">WOD</div>
                {/* Map movements */}
                <div className="text-sm">
                  {workout?.movements.map((movement) => (
                    <div key={movement.id}>
                      <div className="text-sm">{movement.name}</div>
                      <div className="text-sm">{movement.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassDetailWod;
