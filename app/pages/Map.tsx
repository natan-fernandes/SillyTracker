import { DateTime } from 'luxon';
import { Marker } from '../types';
import * as Crypto from 'expo-crypto';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { BottomBar } from '../components/BottomBar'
import { DateFilter } from '../components/DateFilter';
import { markerStorage } from '../data/markerStorage';
import { Map as MapComponent } from '../components/Map';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Map = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [startDate, setStartDate] = useState<DateTime>(DateTime.now());
  const [endDate, setEndDate] = useState<DateTime>(DateTime.now());
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [tracking, setTracking] = useState<Location.LocationSubscription>(undefined);

  useEffect(() => {
    const getMarkers = async () => {
      return await markerStorage.getAll(startDate, endDate);
    }
    getMarkers().then(setMarkers);
  }, [startDate, endDate]);

  useEffect(() => {
    const startTracking = async () => {
      const tracking = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10,
        timeInterval: 5000
      }, async (location) => {
        const marker: Marker = {
          ...location.coords,
          id: Crypto.randomUUID(),
          createdAt: DateTime.now().toSeconds()
        }
        setMarkers([...markers, marker]);
        await markerStorage.add(marker);
      });
      setTracking(tracking);
    }

    if (isTracking) {
      startTracking();
    } else {
      tracking?.remove();
      setTracking(undefined);
    }
  }, [isTracking]);

  return (
    <SafeAreaView>
      <DateFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <BottomBar
        markers={markers}
        setMarkers={setMarkers}
        isTracking={isTracking}
        setIsTracking={setIsTracking}
      />
      <MapComponent 
        markers={markers}
      />
    </SafeAreaView>
  )
}
