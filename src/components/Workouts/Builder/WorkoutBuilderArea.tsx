import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/config/axios.config";
import { queryClient } from "@/config/queryClient";
import { sectionsAtom } from "@/store/workout";
import {
  ClientError,
  Workout,
  WorkoutList,
  WorkoutMovement
} from "@/types";
import { EndpointType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { PlusIcon } from "lucide-react";
import SectionDroppableArea from "./SectionDroppableArea";
import WorkoutSectionCard from "./WorkoutSectionCard";

const MAX_SECTIONS = 3;

const WorkoutBuilderArea: React.FC = () => {
  const [sections, setSections] = useAtom(sectionsAtom);

  const createWorkoutMutation = useMutation<Workout[], AxiosError<ClientError>, WorkoutList>({
    mutationFn: async (payload: WorkoutList) => {
      const formattedPayload = payload.map((section) => ({
        title: section.title,
        type: "ForTime",
        intensity: "High",
        duration: 20,
        movements: section.movements.map((movement: WorkoutMovement, index: number) => ({
          movementId: movement.id,
          reps: 21,
          sets: null,
          weight: 225,
          weightUnit: "lbs",
          order: index + 1,
        })),
      }));
  
      const responses: Workout[] = [];
  
      for (const workout of formattedPayload) {
        const response = await apiClient.post<Workout[]>(
          `${EndpointType.Workout}/create`,
          workout
        );
        responses.push(...(Array.isArray(response.data) ? response.data : [response.data]));
      }
  
      return responses;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      console.log("All workouts created successfully:", data);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error || "An unexpected error occurred";
      console.error("Error creating workouts:", errorMessage);
    },
  });

  const addNewSection = () => {
    if (sections.length >= MAX_SECTIONS) {
      alert("You can't add more than 3 sections.");
    } else {
      const newSection = {
        id: Date.now().toString(),
        title: `New Component ${sections.length + 1}`,
        movements: [],
      };
      setSections([...sections, newSection]);
    }
  };

  return (
    <div className="flex flex-col min-h-full p-4 space-y-4">
      <div className="flex justify-between">
        <Label className="text-lg font-semibold">Workout Builder</Label>
        <Button onClick={addNewSection} variant="default">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-grow border rounded-lg grid grid-cols-2 gap-x-2">
          {sections.map((section) => (
            <WorkoutSectionCard key={section.id} section={section} />
          ))}

          <SectionDroppableArea />
          <div>
            <Button
              onClick={() => createWorkoutMutation.mutateAsync(sections)}
              className="col-span-2"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutBuilderArea;
