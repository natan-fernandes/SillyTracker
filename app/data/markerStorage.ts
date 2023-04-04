import AsyncStorage from '@react-native-async-storage/async-storage';
import { Marker } from '../types/marker';

const getAll = async (): Promise<Marker[]> => {
  const data = await AsyncStorage.getItem('@markers');
  return JSON.parse(data);
}

const add = async (marker: Marker) => {
  const markers = await getAll() ?? [];
  const newMarkers = [...markers, marker];
  const data = JSON.stringify(newMarkers);

  await AsyncStorage.setItem('@markers', data);
}

export const markerStorage = {
  getAll,
  add
}
