import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { droppedSectionsAtom, sectionsAtom } from "@/store/workout";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useAtom } from "jotai";
import { GripVertical, HardDriveUpload, PlusIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, } from "lucide-react"; 

const DroppableArea: React.FC = () => {
    const [droppedSections] = useAtom(droppedSectionsAtom);
    const { isOver, setNodeRef } = useDroppable({ id: "droppable-area" });

    const style = {
        backgroundColor: isOver ? "rgba(209, 250, 229, 0.4)" : "white",
    };

    return (
        <Card
            ref={setNodeRef}
            className="flex flex-col h-64 overflow-hidden border-dashed shadow-lg border-neutral-300"
            style={style}
        >
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-indigo-600" />
                    <CardTitle className="text-lg font-bold">Drop Sections Here</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
                {droppedSections.length === 0 ? (
                    <>
                        <HardDriveUpload className="w-12 h-12 text-gray-400" />
                        <Label className="text-sm text-gray-600">
                            Drag and drop sections here to add them to the workout.
                        </Label>
                    </>
                ) : (
                    <ScrollArea className="w-full max-h-48 overflow-y-auto">
                        <ul className="space-y-3">
                            {droppedSections.map((section) => (
                                <li
                                    key={section.id}
                                    className="p-4 bg-white border rounded-lg shadow-sm"
                                >
                                    <div className="flex flex-col space-y-1">
                                        <Label className="font-medium">{section.name}</Label>
                                        <ul className="space-y-1">
                                            {section?.movements?.map((movement) => (
                                                <li
                                                    key={movement.id}
                                                    className="text-sm text-gray-600 flex items-center"
                                                >
                                                    - {movement.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                )}
                {droppedSections.length > 0 && (
                    <Button variant="outline" size="sm" className="mt-2">
                        Clear All
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

const WorkoutBuilderArea: React.FC = () => {
    const [sections, setSections] = useAtom(sectionsAtom);
    const [droppedSections, setDroppedSections] = useAtom(droppedSectionsAtom);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over) return;

        if (over.id === "droppable-area") {
            // Handle drop into the Droppable Area
            const draggedSection = sections.find((s) => s.id === active.id);
            if (draggedSection) {
                setDroppedSections((prev) => [...prev, draggedSection]);
                setSections((prev) =>
                    prev.filter((section) => section.id !== draggedSection.id)
                );
            }
        } else if (active.id !== over.id) {
            // Reorder sections within the Sortable List
            const oldIndex = sections.findIndex((section) => section.id === active.id);
            const newIndex = sections.findIndex((section) => section.id === over.id);
            setSections(arrayMove(sections, oldIndex, newIndex));
        }
    };

    const addNewSection = () => {
        if (sections.length > 3) {
            alert("You can't add more than 3 sections.");
        } else {
            const newSection = {
                id: Date.now().toString(),
                name: `New Section`,
                movements: [],
            };
            setSections([...sections, newSection]);
        }
    };

    return (
        <div className="flex flex-col h-full p-4 space-y-4">
            <div className="flex justify-between">
                <Label className="text-lg font-semibold">Workout Builder</Label>
                <Button onClick={addNewSection} variant="default">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Section
                </Button>
            </div>

            <div className="flex space-x-4">
                <ScrollArea className="flex-grow border rounded-lg">
                    <DndContext onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={sections?.map((section) => section.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {sections?.map((section) => (
                                <SortableSectionCard key={section.id} section={section} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </ScrollArea>

            </div>
            <DroppableArea />
        </div>
    );
};

const SortableSectionCard = ({
    section,
    onMovementDrop,
}: {
    section: any;
    onMovementDrop: (movement: any, sectionId: string) => void;
}) => {
    const { attributes, listeners, setNodeRef: setDragNodeRef, transform, transition } =
        useDraggable({ id: section.id });

    const { setNodeRef: setDropNodeRef, isOver } = useDroppable({
        id: `droppable-movement-${section.id}`,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: isOver ? "2px dashed #4ade80" : "1px solid #e5e7eb",
    };

    return (
        <div
            ref={(node) => {
                setDragNodeRef(node);
                setDropNodeRef(node);
            }}
            style={style}
            {...attributes}
            {...listeners}
            className="p-4 mb-4 border rounded-lg shadow-md bg-white"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
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
            </div>
            <ul className="space-y-2">
                {section?.movements?.map((movement: any) => (
                    <li
                        key={movement.id}
                        className="flex items-center justify-between p-2 border rounded-md"
                    >
                        <span className="text-sm">{movement.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutBuilderArea;

