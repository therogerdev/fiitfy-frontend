import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useAtom } from "jotai";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { movementOptions, Section, sectionsAtom } from "./WorkoutBuilder";
import { Movement } from "@/types";

const SectionManager = () => {
  const [sections, setSections] = useAtom(sectionsAtom);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((sec) => sec.id === active.id);
      const newIndex = sections.findIndex((sec) => sec.id === over.id);

      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="space-y-4">
        {sections.map((section) => (
          <SectionDroppable key={section.id} section={section} />
        ))}
      </div>
    </DndContext>
  );
};

export default SectionManager;


interface SectionDroppableProps {
  section: Section;
}

const SectionDroppable: React.FC<SectionDroppableProps> = ({ section }) => {
  const [sections] = useAtom(sectionsAtom);
  const { isOver, setNodeRef } = useDroppable({ id: section.id });

  const currentSection = sections.find((s) => s.id === section.id);

  return (
    <div
      ref={setNodeRef}
      className={`p-4 bg-white border rounded-md shadow ${
        isOver ? "bg-blue-100" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-bold">{section.type}</h3>
      <SortableContext items={currentSection?.movements || []} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {currentSection?.movements.map((movement) => (
            <MovementCard key={movement.id} movement={movement} sectionId={section.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export const MovementDraggable = () => {
  return (
    <div className="p-4 bg-white border rounded-md shadow">
      <h2 className="mb-2 text-lg font-semibold">Available Movements</h2>
      <div className="grid grid-cols-2 gap-4">
        {movementOptions.map((movement) => (
          <DraggableMovement key={movement.id} movement={movement} />
        ))}
      </div>
    </div>
  );
};

const DraggableMovement = ({ movement }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: movement.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-2 bg-gray-100 border rounded-md shadow cursor-pointer"
    >
      {movement.name}
    </div>
  );
};

interface MovementCardProps {
  id: string;
  title: string;
  links: { name: string; url: string }[];
  sectionId: string;
}



const MovementCard: React.FC<MovementCardProps> = ({ id, title, links, sectionId }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      id,
      sectionId,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50">
        {title}
      </h3>
      <div className="mt-2 space-y-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-xs text-gray-900 dark:text-gray-50 px-3 py-1.5 rounded-lg font-semibold"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

// import {
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   closestCenter,
//   useDraggable,
//   useDroppable,
// } from "@dnd-kit/core";
// import {
//   restrictToParentElement,
//   restrictToVerticalAxis,
// } from "@dnd-kit/modifiers";
// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import { useAtom } from "jotai";
// import React, { useState } from "react";
// import { SectionCard } from "./SectionCard";
// import { Section, sectionsAtom } from "./WorkoutBuilder";
// import { useListMovement } from "@/hooks/useListMovement";

// const sectionOptions: Section[] = [
//   { id: "warm-up", type: "Warm-up" },
//   { id: "skill-strength", type: "Skill/Strength" },
//   { id: "wod", type: "WOD" },
// ];

// const DraggableSection = ({ id, name }: { id: string; name: string }) => {
//   const { attributes, listeners, setNodeRef } = useDraggable({ id });

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className="p-3 mb-2 bg-white rounded shadow cursor-pointer"
//     >
//       {name}
//     </div>
//   );
// };

// interface SectionManagerProps {
//   sections: Section[];
//   setSections: (sections: Section[]) => void;
// }

// const DroppableWorkoutArea: React.FC<{ sections: Section[] }> = ({
//   sections,
// }) => {
//   const { setNodeRef } = useDroppable({
//     id: "workout-area",
//   });

//   return (
//     <div ref={setNodeRef} className="w-2/3 p-4 rounded-lg shadow-md bg-gray-50">
//       <h3 className="mb-4 text-lg font-bold">Workout Area</h3>
//       <SortableContext items={sections.map((section) => section.id)}>
//         {sections.map((section) => (
//           <SectionCard key={section.id} id={section.id} type={section.type} />
//         ))}
//       </SortableContext>
//     </div>
//   );
// };

// export const SectionManager: React.FC<SectionManagerProps> = () => {
//   const [sections, setSections] = useAtom(sectionsAtom);
//   const [activeId, setActiveId] = useState<string | null>(null);

//   const handleDragStart = (event: DragStartEvent) => {
//     setActiveId(String(event.active.id));
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     setActiveId(null);

//     if (!active || !over) {
//       console.error("Drag operation ended outside valid droppable areas");
//       return;
//     }

//     // Reorder sections within the workout area
//     if (active.id !== over.id) {
//       const oldIndex = sections.findIndex(
//         (section) => section.id === active.id
//       );
//       const newIndex = sections.findIndex((section) => section.id === over.id);
//       if (oldIndex >= 0 && newIndex >= 0) {
//         setSections(arrayMove(sections, oldIndex, newIndex));
//       }
//     }

//     // Add a new section from the options
//     if (
//       over.id === "workout-area" &&
//       !sections.find((sec) => sec.id === active.id)
//     ) {
//       const newSection = sectionOptions.find(
//         (option) => option.id === active.id
//       );
//       if (newSection && sections.length < 3) {
//         setSections([
//           ...sections,
//           { id: `${newSection.id}-${Date.now()}`, type: newSection.type },
//         ]);
//       }
//     }
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       modifiers={[restrictToParentElement, restrictToVerticalAxis]} // Ensure these match your UI needs
//     >
//       <div className="flex gap-4">
//         {/* Section Options */}
//         <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-sm">
//           <h3 className="mb-4 text-lg font-bold">Section Options</h3>
//           {sectionOptions.map((section) => (
//             <DraggableSection
//               key={section.id}
//               id={section.id}
//               name={section.type}
//             />
//           ))}
//         </div>

//         {/* Workout Area */}
//         <DroppableWorkoutArea sections={sections} />
//       </div>

//       {/* Drag Overlay */}
//       <DragOverlay
//         style={{
//           transform: "translate(0, 0)", // Ensure alignment with the draggable element
//           position: "absolute",
//         }}
//       >
//         {activeId && (
//           <div className="p-3 bg-white rounded shadow cursor-pointer">
//             {sectionOptions.find((section) => section.id === activeId)?.type ||
//               sections.find((section) => section.id === activeId)?.type}
//           </div>
//         )}
//       </DragOverlay>
//     </DndContext>
//   );
// };

// export const MovementDraggable = () => {
//   const { movements, isLoading, error } = useListMovement();
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!movements) return <div>No data</div>;
//   return (
//     <div>
//       {movements.data.map((movement) => {
//         return (
//           <div
//             key={movement.id}
//             className="max-w-sm p-3 bg-white border rounded shadow cursor-pointer"
//           >
//             <div>{movement.name}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
