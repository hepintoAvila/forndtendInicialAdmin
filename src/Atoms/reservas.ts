import { EventInput } from '@fullcalendar/core/index.js';
import { atom } from 'jotai'
export const reservaAtoms = atom<EventInput[]>([]);
export const carritoAtoms = atom<EventInput[]>([]);
export const itemsagendaAtoms = atom<EventInput[]>([]);
export const itemsprofesionalesAtoms = atom<EventInput[]>([]);
