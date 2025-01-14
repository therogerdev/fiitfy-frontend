import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Section } from "@/hooks/useSectionDragAndDrop";
import { cn } from "@/lib/utils";
import { sectionsAtom } from "@/store/workout";
import { useDroppable } from "@dnd-kit/core";
import { useSetAtom } from "jotai";
import { GripVertical, HardDriveUpload, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import MovementItem from "./MovementItem";
import { Checkbox } from "@/components/ui/checkbox";

interface WorkoutSectionCardProps {
  section: Section;
}

const WorkoutSectionCard: React.FC<WorkoutSectionCardProps> = ({ section }) => {
  const {
    setNodeRef: setDropNodeRef,
    isOver,
    active,
  } = useDroppable({
    id: `droppable-section-${section.id}`,
  });

  const isMovement = active?.data?.current?.type === "movement";
  const setSections = useSetAtom(sectionsAtom);
  const [hideForm, setHideForm] = useState(false);

  const handleInputChange = (
    movementId: string,
    field: string,
    value: string | number
  ) => {
    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === section.id
          ? {
              ...s,
              movements: s.movements.map((movement) =>
                movement.id === movementId
                  ? { ...movement, [field]: value }
                  : movement
              ),
            }
          : s
      )
    );
  };

  const handleRemoveMovement = (movementId: string) => {
    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === section.id
          ? {
              ...s,
              movements: s.movements.filter(
                (movement) => movement.id !== movementId
              ),
            }
          : s
      )
    );
  };

  const onDeleteSection = () => {
    setSections((prevSections) =>
      prevSections.filter((s) => s.id !== section.id)
    );
  };

  return (
    <div
      ref={setDropNodeRef}
      role="region"
      aria-label={`Drop movements into section ${section.name}`}
      className={cn("relative p-4 mb-4 border rounded-lg shadow-md bg-white", {
        "bg-accent": isOver,
        "border-2 border-dashed": isOver,
      })}
    >
      <WorkoutSectionCardOverlay
        section={section}
        isOver={isOver}
        isMovement={isMovement}
      />
      <div className="flex items-center justify-between mb-2  ">
        <div className="flex items-center justify-between gap-2 w-full">
          <div>
            <Button
              size="icon"
              variant="ghost"
              className="cursor-grab"
              aria-label="Drag Section"
            >
              <GripVertical className="w-4 h-4" />
            </Button>
            <Label className="text-base font-semibold">{section.name}</Label>
          </div>
          <div className="flex gap-x-2">
            {section.movements.length > 0 && (
              <div>
                {" "}
                <Checkbox
                  className="mr-2"
                  onCheckedChange={(checked) => setHideForm(!checked)}
                />
                <span className="text-sm">Add instructions</span>
              </div>
            )}
            <span onClick={onDeleteSection} className="text-sm cursor-pointer">
              <Trash2Icon className="stroke-red-600" />
            </span>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {section.movements.length === 0 && (
          <div className="rounded-md flex justify-center items-center flex-col p-5 border border-dashed">
            <HardDriveUpload className="w-8 h-8 text-gray-400" />
            <Label className="text-sm text-gray-600">
              Drag and drop <span className="font-bold">movement</span> here to
              add them to the workout section.
            </Label>
          </div>
        )}
        {section.movements.map((movement) => (
          <MovementItem
            key={movement.id}
            movement={movement}
            hideForm={hideForm}
            onInputChange={(field, value) =>
              handleInputChange(movement.id, field, value)
            }
            onRemove={() => handleRemoveMovement(movement.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default WorkoutSectionCard;

const WorkoutSectionCardOverlay = ({
  section,
  isOver,
  isMovement,
}: {
  section: Section;
  isOver: boolean;
  isMovement: boolean;
}) => {
  return (
    <>
      {section.movements.length > 0 && isOver && (
        <div
          className={`absolute bg-gray-300 ${
            isMovement ? "cursor-grabbing" : "cursor-not-allowed"
          } inset-y-0 inset-x-0 flex items-center justify-center opacity-50`}
        >
          <div className="rounded-md flex justify-center items-center flex-col p-5 border border-dashed">
            <HardDriveUpload className="w-8 h-8 text-black" />
            <Label className="text-sm text-black">
              Drop <span className="font-bold">movement</span> here to add them
              to the workout section.
            </Label>
          </div>
        </div>
      )}
    </>
  );
};
