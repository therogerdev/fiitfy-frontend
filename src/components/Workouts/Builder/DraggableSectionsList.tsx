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
import { useDraggable } from "@dnd-kit/core";
import { GripVertical, PlusIcon } from "lucide-react";


// array for Sections presets
const sections = [
    { id: 1, title: "Component 1 - Warming up", movements: [] },
    { id: 2, title: "Component 2 - Skill/Strength", movements: [] },
    { id: 3, title: "Component 3 - WOD", movements: [] },
  ];
  

  
export const DraggableSectionsList = () => {
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
  
  const DraggableSectionItem = ({ section }: { section: { id: any; title: string } }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
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
            className={`cursor-pointer flex items-center gap-2 transition-opacity duration-200 ${
                isDragging ? "opacity-50" : "opacity-100"
            }`}
        >
            <PlusIcon className="w-3.5" />
            <Label className="mx-1">{section.title}</Label>
            <GripVertical className="absolute right-2" />
        </CommandItem>
    );
};