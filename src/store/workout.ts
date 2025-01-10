import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const sectionsAtom = atomWithStorage<{ id: string; name: string; movements: any[] }[]>(
  "sections",
  []
);

export const droppedSectionsAtom = atom<any[]>([]);