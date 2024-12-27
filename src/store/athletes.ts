import { atom } from "jotai";

export const totalAthletesAtom = atom<number>(0);
export const currentPageAtom = atom<number>(1);
export const rowsPerPageAtom = atom<number>(10);
