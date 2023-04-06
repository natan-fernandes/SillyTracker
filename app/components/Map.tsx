import tw from 'twrnc';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Marker as MarkerType } from '../types';
import { View, Dimensions } from 'react-native';
import MapView, { Circle, LatLng, Marker, Polyline, Region } from 'react-native-maps';

interface MapProps {
  markers: MarkerType[],
}

export const Map = (props: MapProps) => {
  const [region, setRegion] = useState<Region>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0);

  useEffect(() => {
    const getLocation = async () => {
      await Location.requestForegroundPermissionsAsync();
      return await Location.getCurrentPositionAsync();
    }
    
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

  //* Doesn't seem to work with spread operator!
  const getPolylineCoords = (): LatLng[] => {
    const coords: LatLng[] = [];
    props.markers.map(marker => coords.push(marker));
    return coords;
  }

  if (!region) return null;

  return (
    <View>
      <MapView 
        style={tw`w-full h-full`}
        initialRegion={region}
        onRegionChangeComplete={updateZoomLevel}
      >
        <Polyline
          coordinates={getPolylineCoords()}
          fillColor="#DC262650"
          strokeColor='#DC2626'
          strokeWidth={10}
        />
        <Circle
          center={{...region}}
          radius={2500000 / (2 ** zoomLevel)}
          fillColor='#00BFFF'
          strokeColor='#00BFFF50'
          strokeWidth={10}
        />
        {
          props.markers.map((marker, index) => 
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
