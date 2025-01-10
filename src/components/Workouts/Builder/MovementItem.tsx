import { WorkoutMovement } from "@/types";
import { Trash2Icon } from "lucide-react";
import React, { memo } from "react";

interface WorkoutMovementWithName extends WorkoutMovement {
    name?: string;
}

const MovementItem: React.FC<{
    movement: Partial<WorkoutMovementWithName>;
    onInputChange: (field: string, value: string | number) => void;
    onRemove: () => void;
    hideForm: boolean; 
}> = memo(({ movement, onInputChange, onRemove, hideForm }) => (
    <li className="flex flex-col p-2 border rounded-md space-y-2">
        <div className="flex flex-row justify-between">
            <span className="font-semibold text-sm">{movement.name}</span>
            <span className="font-semibold text-sm">
                <Trash2Icon
                    className="w-4 h-4 cursor-pointer  stroke-red-600"
                    onClick={onRemove}
                />
            </span>
        </div>
        {!hideForm && ( 
            <div className="flex gap-4 items-center">
                <input
                    type="number"
                    placeholder="Reps"
                    className="w-20 p-2 border rounded-md text-sm"
                    value={movement.reps || ""}
                    onChange={(e) => onInputChange("reps", parseInt(e.target.value) || 0)}
                />
                x
                <input
                    type="number"
                    placeholder="Sets"
                    className="w-20 p-2 border rounded-md text-sm"
                    value={movement.sets || ""}
                    onChange={(e) => onInputChange("sets", parseInt(e.target.value) || 0)}
                />
                @
                <input
                    type="number"
                    placeholder="Weight"
                    className="w-20 p-2 border rounded-md text-sm"
                    value={movement.weight || ""}
                    onChange={(e) => onInputChange("weight", parseInt(e.target.value) || 0)}
                />
                <select
                    className="w-28 p-2 border rounded-md text-sm"
                    value={movement.weightUnit || "kg"}
                    onChange={(e) => onInputChange("weightUnit", e.target.value)}
                >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                </select>
                <input
                    type="text"
                    placeholder="Instructions"
                    className="w-full p-2 border rounded-md text-sm mt-2"
                    value={movement.instructions || ""}
                    onChange={(e) => onInputChange("instructions", e.target.value)}
                />
            </div>
        )}
    </li>
));

export default MovementItem;