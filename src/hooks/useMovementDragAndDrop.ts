import { DragEndEvent } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { sectionsAtom } from "@/store/workout";
import { Movement } from "@/types";

export const useMovementDragAndDrop = () => {
  const [sections, setSections] = useAtom(sectionsAtom);

  const handleMovementDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;

    const movementDropped: Movement = event.active.data.current?.movement;

    if (!movementDropped) return;

    setSections((prev) =>
      prev.map((section) => {
        if (`droppable-section-${section.id}` === event.over?.id) {
          return {
            ...section,
            movements: [
              ...section.movements,
              {
                id: movementDropped.id,
                title: movementDropped.name,
                category: movementDropped.category,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  return {
    sections,
    handleMovementDragEnd,
  };
};