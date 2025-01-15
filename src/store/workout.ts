import { Movement } from "@/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const sectionsAtom = atomWithStorage<{ id: string; title: string; movements: Movement[] }[]>(
  "sections",
  []
);

export const droppedSectionsAtom = atom<any[]>([]);