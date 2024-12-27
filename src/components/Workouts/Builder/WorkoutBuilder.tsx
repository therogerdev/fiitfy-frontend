import { GripVertical, PlusIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { useListMovement } from "@/hooks/useListMovement";
import WorkoutBuilderArea from "./WorkoutBuilderArea";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { droppedSectionsAtom, sectionsAtom } from "@/store/workout";
import { Movement } from "@/types";

const WorkoutBuilder = () => {


  return (
    <WorkoutBuilderLayout>
      <WorkoutBuilderArea />
    </WorkoutBuilderLayout>
  );
};

export default WorkoutBuilder;

export const WorkoutBuilderLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [droppedSections, setDroppedSections] = useAtom(droppedSectionsAtom);
  const [sections, setSections] = useAtom(sectionsAtom);
  const handleDragEnd = (event: any) => {


    if (!event.over) return;
    if (event.over.id === "droppable-area" && event.active.data.current.type === "section") {
      const droppedSection = event.active.data.current.section;
      // You can further handle section drop here.
      console.log("Dropped Section:", droppedSection);

      setSections((prev) => [...prev, droppedSection]);


    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid h-full col-span-1 overflow-hidden md:grid-cols-2 lg:grid-cols-12">
        <div className="overflow-hidden border-r md:col-span-2 lg:col-span-3">
          <div className="flex flex-col h-full overflow-hidden bg-white border gap-y-2">
            <WorkoutBuilderSectionList />
            <WorkoutBuilderMovementList />
          </div>
        </div>
        <div className="border-r lg:col-span-9">
          <div className="flex flex-col h-full">{children}</div>
        </div>
      </div>
    </DndContext>
  );
};

// array for Sections
const sections = [
  { id: 1, name: "Component 1 - Warming up", movements: [] },
  { id: 2, name: "Component 2 - Skill/Strength", movements: [] },
  { id: 3, name: "Component 3 - WOD", movements: [] },
];

export const WorkoutBuilderSectionList = () => {
  return (
    <div>
      <Command className="rounded-lg">
        <CommandInput placeholder="search sections..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Sections">
            {sections.map((section) => (
              <DraggableSectionItem key={section.id} section={section} />
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};

const DraggableSectionItem = ({ section }: { section: { id: any; name: string } }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: section.id,
    data: {
      type: "section",
      section,
    },
  });


  return (
    <CommandItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="cursor-pointer flex items-center gap-2"
    >
      <PlusIcon className="w-3.5" />
      <Label className="mx-1">{section.name}</Label>
      <GripVertical className="absolute right-2" />
    </CommandItem>
  );
};


export const WorkoutBuilderMovementList = () => {
  const { movements, error, isLoading } = useListMovement();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="overflow-hidden">
      <Command>
        <CommandInput placeholder="Search movements..." />
        <CommandList className="max-h-[600px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Movements">
            {movements?.data.map((movement) => {
              return (
                <DraggableMovementItem
                  key={movement.id}
                  movement={movement}
                />
              );
            })}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};


//DraggableMovementItem
const DraggableMovementItem = ({ movement }: { movement: Movement }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: movement.id,
    data: {
      type: "movement",
      movement,
    },
  });

  return (
    <CommandItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="cursor-pointer flex items-center gap-2"
    >
      <PlusIcon className="w-3.5" />
      <span className="mx-1">{movement.name}</span>
      <GripVertical className="absolute right-2" />
    </CommandItem>
  );
};