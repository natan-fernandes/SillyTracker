import { useState, useEffect } from 'react';
import { Marker } from '../types';
import { View } from 'react-native'
import { BottomBar } from '../components/BottomBar'
import { Map as MapComponent } from '../components/Map';
import { markerStorage } from '../data/markerStorage';

export const Map = () => {
  const [markers, setMarkers] = useState<Marker[]>();

  useEffect(() => {
    const getMarkers = async () => {
      return await markerStorage.getAll();
    }

    getMarkers().then(setMarkers);
  }, []);

  return (
    <View>
      <BottomBar
        markers={markers}
        setMarkers={setMarkers}
      />
      <MapComponent 
        markers={markers}
      />
    </View>
  )
}
