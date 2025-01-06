import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sectionsAtom } from "@/store/workout";
import { useAtom } from "jotai";
import { PlusIcon } from "lucide-react";
import WorkoutSectionCard from "./WorkoutSectionCard";
import SectionDroppableArea from "./SectionDroppableArea";


const MAX_SECTIONS = 3;

const WorkoutBuilderArea: React.FC = () => {
    const [sections, setSections] = useAtom(sectionsAtom);


    const addNewSection = () => {
        if (sections.length >= MAX_SECTIONS) {
            alert("You can't add more than 3 sections.");
        } else {
            const newSection = {
                id: Date.now().toString(),
                name: `New Component ${sections.length + 1}`,
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
                <div className="flex-grow border rounded-lg grid grid-cols-2 gap-x-2">

                    {sections.map((section) => (
                        <WorkoutSectionCard
                            key={section.id}
                            section={section}

                        />
                    ))}

                    <SectionDroppableArea />
                </div>

            </div>
        </div>
    );
};


export default WorkoutBuilderArea;



