import { atom } from "jotai";



export const sectionsAtom = atom<{ id: string, name: string, movements: any[] }[] | []>([
]);

export const droppedSectionsAtom = atom<any[]>([]);