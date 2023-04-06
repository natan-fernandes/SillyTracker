import AsyncStorage from '@react-native-async-storage/async-storage';
import { Marker } from '../types/marker';
import { DateTime } from 'luxon';

const getAll = async (start: DateTime, end: DateTime): Promise<Marker[]> => {
  const data = await AsyncStorage.getItem('@markers');
  const markers = JSON.parse(data) as Marker[];
  
  if (!markers) return new Array<Marker>();
  
  const startUnix = start.startOf('day').toSeconds();
  const endUnix = end.endOf('day').toSeconds();

  const filteredMarkers = markers.filter(marker => marker.createdAt >= startUnix && marker.createdAt <= endUnix);
  return filteredMarkers;
}

const add = async (marker: Marker) => {
  const markers = JSON.parse(await AsyncStorage.getItem('@markers')) as Marker[] ?? new Array<Marker>();
  const newMarkers = [...markers, marker];
  const data = JSON.stringify(newMarkers);

  await AsyncStorage.setItem('@markers', data);
}

export const markerStorage = {
  getAll,
  add
}
