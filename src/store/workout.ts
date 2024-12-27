import { atom } from "jotai";



export const sectionsAtom = atom<{id: string, name: string, movements: any[]}[] | []>([
  {
    id: "1",
    name: "Warmup Section",
    movements: [
      { id: "m1", name: "Jumping Jacks", category: "Warmup" },
      { id: "m2", name: "High Knees", category: "Warmup" },
    ],
  },
  {
    id: "2",
    name: "Strength Section",
    movements: [
      { id: "m3", name: "Bench Press", category: "Strength" },
      { id: "m4", name: "Deadlift", category: "Strength" },
    ],
  },
]);

export const droppedSectionsAtom = atom<any[]>([]);