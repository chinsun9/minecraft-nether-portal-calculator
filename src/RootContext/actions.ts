import { Position } from '../type';

export type Action =
  | { type: 'RESET_PORTALS' }
  | { type: 'ADD_PORTAL'; coord: Position }
  | { type: 'DEL_PORTAL'; id: number }
  | { type: 'EDIT_PORTAL'; id: number; title: string };
