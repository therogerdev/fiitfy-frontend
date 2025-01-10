import { useMovementDragAndDrop } from "@/hooks/useMovementDragAndDrop";
import { useSectionDragAndDrop } from "@/hooks/useSectionDragAndDrop";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DraggableMovementList } from "./DraggableMovementList";
import { DraggableSectionsList } from "./DraggableSectionsList";


interface DragDataType {
  type: "section" | "movement";
}

const WorkoutBuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const { handleSectionDragEnd } = useSectionDragAndDrop();
  const { handleMovementDragEnd } = useMovementDragAndDrop();

  const handleDragEnd = (event: DragEndEvent) => {
    const data = event.active.data.current as DragDataType | undefined;
    if (!data) return;
    if (data.type === "section") {
      handleSectionDragEnd(event);
    } else if (data.type === "movement") {
      handleMovementDragEnd(event);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid h-full col-span-1 overflow-hidden md:grid-cols-2 lg:grid-cols-12">
        <div className="overflow-hidden border-r md:col-span-2 lg:col-span-3">
          <div className="flex flex-col h-full overflow-hidden bg-white border gap-y-2">
            <DraggableSectionsList />
            <DraggableMovementList />
          </div>
        </div>
        <div className="border-r lg:col-span-9">
          <div className="flex flex-col h-full">{children}</div>
        </div>
      </div>
    </DndContext>
  );
};

export default WorkoutBuilderLayout