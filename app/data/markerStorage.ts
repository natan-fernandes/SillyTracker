import AsyncStorage from '@react-native-async-storage/async-storage';
import { Marker } from '../types/marker';

const getAll = async (): Promise<Marker[]> => {
  const data = await AsyncStorage.getItem('@markers');
  const objects = JSON.parse(data);
  return objects ?? [];
}

const add = async (marker: Marker) => {
  const markers = await getAll();
  const newMarkers = [...markers, marker];
  const data = JSON.stringify(newMarkers);

  await AsyncStorage.setItem('@markers', data);
}

export const markerStorage = {
  getAll,
  add
}
