import { ClassMovementsListType } from '@/components/Class/ClassDetailWod';
import { atom } from 'jotai';

export const searchQueryAtom = atom<string>('');
export const selectedAthleteIdAtom = atom<string | null>(null);


export const selectedDateAtom = atom<Date>(new Date());


export const classMovementsListAtom = atom<ClassMovementsListType[] | null>(null);
