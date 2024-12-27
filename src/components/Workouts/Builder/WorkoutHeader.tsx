import { useAtom } from "jotai";
import React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
    workoutDurationAtom,
    workoutIntensityAtom,
    workoutTitleAtom,
} from "./WorkoutBuilder";

const WorkoutHeader: React.FC = () => {
  // State management using Jotai
  const [title, setTitle] = useAtom(workoutTitleAtom);
  const [duration, setDuration] = useAtom(workoutDurationAtom);
  const [intensity, setIntensity] = useAtom(workoutIntensityAtom);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full gap-4 p-4 bg-white rounded-lg shadow-md"
    >
      {/* Workout Title */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="workout-title"
          className="text-sm font-medium text-gray-700"
        >
          Workout Title
        </label>
        <Input
          id="workout-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter workout title"
        />
      </div>

      {/* Duration and Intensity */}
      <div className="flex items-center gap-4">
        {/* Duration */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="workout-duration"
            className="text-sm font-medium text-gray-700"
          >
            Duration (minutes)
          </label>
          <Input
            id="workout-duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="e.g., 30"
          />
        </div>

        {/* Intensity */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Intensity</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{intensity}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Low", "Moderate", "High"].map((level) => (
                <DropdownMenuItem
                  key={level}
                  onClick={() => setIntensity(level)}
                >
                  {level}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* AI Suggestions Button */}
      <div className="flex justify-end mt-4">
        <Button>AI Suggestion</Button>
      </div>
    </motion.div>
  );
};

export default WorkoutHeader;
