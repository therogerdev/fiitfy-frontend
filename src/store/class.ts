import { atom } from 'jotai';

export const searchQueryAtom = atom<string>('');
export const selectedAthleteIdAtom = atom<string | null>(null);