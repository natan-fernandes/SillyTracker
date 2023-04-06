import { DateTime } from 'luxon';
import { Marker } from '../types';
import { useState, useEffect } from 'react';
import { BottomBar } from '../components/BottomBar'
import { markerStorage } from '../data/markerStorage';
import { Map as MapComponent } from '../components/Map';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateFilter } from '../components/DateFilter';

export const Map = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [startDate, setStartDate] = useState<DateTime>(DateTime.now());
  const [endDate, setEndDate] = useState<DateTime>(DateTime.now());

  useEffect(() => {
    const getMarkers = async () => {
      return await markerStorage.getAll(startDate, endDate);
    }
    getMarkers().then(setMarkers);
  }, [startDate, endDate]);

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
      />
      <MapComponent 
        markers={markers}
      />
    </SafeAreaView>
  )
}
