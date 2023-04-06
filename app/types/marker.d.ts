import { DateTime } from 'luxon';

export type Marker = {
  id: string;
  latitude: number;
  longitude: number;
  createdAt: number; // *In seconds!
}
