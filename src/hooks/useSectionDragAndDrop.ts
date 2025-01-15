import { DragEndEvent } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { sectionsAtom } from "@/store/workout";
import { Movement } from "@/types";

export interface Section {
    id: string;
    title: string;
    movements: Movement[];
  }
  

export const useSectionDragAndDrop = () => {
  const [sections, setSections] = useAtom(sectionsAtom);

  const handleSectionDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;

    if (
      event.over.id === "droppable-area" &&
      event.active.data.current?.type === "section"
    ) {
      const droppedSection: Section = event.active.data.current.section;

      setSections((prev) => [...prev, droppedSection]);
    }
  };

  return {
    sections,
    handleSectionDragEnd,
  };
};