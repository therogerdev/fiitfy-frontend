import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateWorkout } from "@/hooks/useCreateWorkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import Modal from "../ui/modal";

const workoutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  type: z.enum([
    "ForTime",
    "AMRAP",
    "EMOM",
    "RFT",
    "Chipper",
    "Ladder",
    "Strength",
    "Skill",
  ]),
  intensity: z.enum(["Low", "Moderate", "High"]),
});

type WorkoutFormValues = z.infer<typeof workoutSchema>;

const WorkoutCreate = () => {
  const { createWorkout, isPending } = useCreateWorkout();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: Number(10),
      type: "ForTime",
      intensity: "Moderate",
    },
  });

  const onSubmit = (data: WorkoutFormValues) => {
    createWorkout(data);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Modal size="lg" open={open} onOpenChange={handleClose}>
      <div className="mb-4 text-2xl font-bold">Create Workout</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter workout title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter workout description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter duration"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "ForTime",
                        "AMRAP",
                        "EMOM",
                        "RFT",
                        "Chipper",
                        "Ladder",
                        "Strength",
                        "Skill",
                      ].map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intensity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intensity</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select workout intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Low", "Moderate", "High"].map((intensity) => (
                        <SelectItem key={intensity} value={intensity}>
                          {intensity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Workout"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default WorkoutCreate;
