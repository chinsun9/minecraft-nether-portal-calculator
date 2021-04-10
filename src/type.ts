import { Dayjs } from 'dayjs';

export type Position = {
  x: number;
  z: number;
};

export type Portal = {
  id: number;
  coord: Position;
  title: string;
  insertDate: Dayjs;
};
