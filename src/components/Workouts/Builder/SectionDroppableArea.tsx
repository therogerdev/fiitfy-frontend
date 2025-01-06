import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { droppedSectionsAtom } from "@/store/workout";
import { Movement } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { AlertCircle, HardDriveUpload } from "lucide-react";



const SectionDroppableArea: React.FC = () => {
    const [droppedSections] = useAtom(droppedSectionsAtom);
    const { isOver, setNodeRef } = useDroppable({ id: "droppable-area" });



    return (
        <Card
            ref={setNodeRef}
            className={cn('flex flex-col col-span-2 overflow-hidden border-dashed shadow-lg border-neutral-300 ', {
                "bg-accent": isOver,
            })}
        >
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <CardTitle className="text-lg font-bold">Drop Sections Here</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4  bg-transparent">
                {droppedSections.length === 0 ? (
                    <div className="p-2 rounded-md flex justify-center items-center flex-col">
                        <HardDriveUpload className="w-8 h-8 text-gray-400" />
                        <Label className="text-sm text-gray-600">
                            Drag and drop <span className="font-bold">section</span> here to add them to the workout.
                        </Label>
                    </div>
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
                                            {section?.movements?.map((movement: Movement) => (
                                                <li
                                                    key={movement.id}
                                                    className="text-sm text-gray-600 flex items-center"
                                                >
                                                    - {movement.name + "section"}
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


export default SectionDroppableArea;