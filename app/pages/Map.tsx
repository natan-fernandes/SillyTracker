import tw from 'twrnc'
import { Marker } from '../types';
import { View } from 'react-native'
import { useState, useEffect } from 'react';
import { BottomBar } from '../components/BottomBar'
import { markerStorage } from '../data/markerStorage';
import { Map as MapComponent } from '../components/Map';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Map = () => {
  const [markers, setMarkers] = useState<Marker[]>();

  useEffect(() => {
    const getMarkers = async () => {
      return await markerStorage.getAll();
    }

    getMarkers().then(setMarkers);
  }, []);

  return (
    <SafeAreaView>
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
