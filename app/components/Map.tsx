import tw from 'twrnc';
import { Marker as MarkerType } from '../types';
import * as Location from 'expo-location';
import { View, Text, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { markerStorage } from '../data/markerStorage';
import MapView, { Circle, Marker, Region } from 'react-native-maps';

export const Map = () => {
  //TODO: SEND MARKERS FROM OUTSIDE
  //*Create pages for every screen
  //*https://expo.github.io/router/docs/

  const [markers, setMarkers] = useState<MarkerType[]>();
  const [region, setRegion] = useState<Region>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0);


  useEffect(() => {
    const getMarkers = async () => {
      return await markerStorage.getAll();
    }

    const getLocation = async () => {
      await Location.requestForegroundPermissionsAsync();
      return await Location.getCurrentPositionAsync();
    }
    
    getMarkers().then(setMarkers);
    getLocation().then(location => {
      const { latitude, longitude } = location.coords;
      const region = { 
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };

      setRegion(region);
      updateZoomLevel(region);
    });
  }, []);

  const updateZoomLevel = (region: Region) => {
    const { width } = Dimensions.get('screen');
    const zoomLevel = Math.log2(360 * (width / 256 / region.longitudeDelta)) + 1;
    setZoomLevel(zoomLevel);
  }

  if (!region) return null;

  return (
    <View>
      <MapView 
        style={tw`w-full h-full`}
        initialRegion={region}
        onRegionChangeComplete={updateZoomLevel}
      >
        <Circle
          center={{...region}}
          radius={3000000 / (2 ** zoomLevel)}
          fillColor='#00BFFF'
          strokeWidth={10}
          strokeColor='#00BFFF50'
        />
        {
          markers?.map((marker, index) => 
            <Marker
              key={index}
              coordinate={{...marker}}
            />
          )
        }

      </MapView>
    </View>
  );
}
