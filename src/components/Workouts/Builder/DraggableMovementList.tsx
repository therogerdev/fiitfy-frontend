
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useListMovement } from "@/hooks/useListMovement";
import { Movement } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical, PlusIcon } from "lucide-react";
  
  
  export const DraggableMovementList = () => {
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
                  <DraggableMovementItems
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
  
  
  
  const DraggableMovementItems = ({ movement }: { movement: Movement }) => {
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