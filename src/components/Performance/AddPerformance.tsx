import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddPerformance } from "@/hooks/useAddPerformance";
import { useParams } from "react-router";
import { classMovementsListAtom } from "../Class/ClassDetailWod";
import { openPerformanceModal } from "../Class/ClassEnrollmentList";
import { Input } from "../ui/input";
import Modal from "../ui/modal";

// Validation schema with Zod
const performanceSchema = z.object({
  sets: z.string().optional(),
  reps: z.string().optional(),
  weight: z.string().optional(),
  weightUnit: z.enum(["kg", "lbs"]).optional(),
  notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
});

type PerformanceFormValues = z.infer<typeof performanceSchema>;

interface AddPerformanceProps {
  athleteId: string;
}

const AddPerformance: FC<AddPerformanceProps> = ({ athleteId }) => {
  const [movements] = useAtom(classMovementsListAtom);

  const { id: classId } = useParams();
  const { mutate: addPerformance } = useAddPerformance();
  const setOpenPerformance = useSetAtom(openPerformanceModal);

  const handleAddPerformance = (
    data: PerformanceFormValues,
    movementId: string
  ) => {
    addPerformance({
      athleteId,
      classId: classId!,
      movementId,
      reps: data.reps || "",
      sets: data.sets || "",
      weight: data.weight || "",
      weightUnit: data.weightUnit || "kg",
      notes: data.notes || "",
      date: new Date().toISOString(),
    });
  };

  return (
    <Modal size="lg" open={true} onClose={() => setOpenPerformance(false)}>
      <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Add Performance</h2>
        {movements?.map((movement) => (
          <MovementForm
            key={movement.movementId}
            movement={movement}
            onAddPerformance={handleAddPerformance}
          />
        ))}
      </div>
    </Modal>
  );
};

export default AddPerformance;

interface MovementFormProps {
  movement: { movementId: string; name: string; category: string };

  onAddPerformance: (data: PerformanceFormValues, movementId: string) => void;
}

const MovementForm: FC<MovementFormProps> = ({
  movement,

  onAddPerformance,
}) => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<PerformanceFormValues>({
    resolver: zodResolver(performanceSchema),
  });

  const onSubmit = (data: PerformanceFormValues) => {
    onAddPerformance(data, movement.movementId);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center space-x-4"
    >
      {/* Movement Name */}
      <div className="flex-1">
        <Label>{movement.name}</Label>
      </div>

      {/* Sets */}
      <div className="w-16">
        <Input {...register("sets")} placeholder="Sets" />
        {errors.sets && (
          <p className="text-sm text-red-500">{errors.sets.message}</p>
        )}
      </div>

      <span>×</span>

      {/* Reps */}
      <div className="w-16">
        <Input {...register("reps")} placeholder="Reps" />
        {errors.reps && (
          <p className="text-sm text-red-500">{errors.reps.message}</p>
        )}
      </div>

      <span>@</span>

      {/* Weight */}
      <div className="w-20">
        <Input {...register("weight")} placeholder="Weight" />
        {errors.weight && (
          <p className="text-sm text-red-500">{errors.weight.message}</p>
        )}
      </div>

      {/* Weight Unit */}
      <div>
        <select
          className="p-1 border border-gray-300 rounded"
          {...register("weightUnit")}
        >
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
        {errors.weightUnit && (
          <p className="text-sm text-red-500">{errors.weightUnit.message}</p>
        )}
      </div>

      {/* Notes */}
      <div className="flex-1">
        <Input {...register("notes")} placeholder="Notes" />
        {errors.notes && (
          <p className="text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      {/* Add Button */}
      <div>
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};
