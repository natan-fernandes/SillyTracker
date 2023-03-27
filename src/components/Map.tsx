import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

let foregroundSubscription = null
export const Map = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      await Location.requestForegroundPermissionsAsync()
    };
    requestPermissions();
    
    setInterval(startForegroundUpdate, 10000);
  }, []);

  const [mapRegion, setMapRegion] = useState({
    latitude: -21.7465511,  
    longitude: -43.3592681,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const [position, setPosition] = useState(null);
  
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log('sem permissão para obter a localização');
      return;
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove()

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      location => {
        setPosition(location.coords);
        const {longitude, latitude} = location.coords;
        const latitudeDelta = 0.009;
        const longitudeDelta = 0.009;
   
        console.log('Received new locations for user = ', longitude, latitude);
   
        setMapRegion({longitude, latitude, latitudeDelta, longitudeDelta});
      }
    )
  }

  return (
    <View style={{flex: 1}}>
       <MapView
          style={{ alignSelf: 'stretch', height: '80%' }}
          region={mapRegion}
        >
        <Marker coordinate={mapRegion} title='UniAcademia' />
        <Polyline coordinates={[{latitude: -21.76301962289848, longitude:-43.35216942082556},{latitude:-21.762342059672694, longitude:-43.34942283890902 }]}
            strokeColor={"#000"}
            strokeWidth={5}
            lineDashPattern={[1]}

        />
      </MapView>
      <Text>Longitude: {position?.longitude}</Text>
      <Text>Latitude: {position?.latitude}</Text>
      <Button
        onPress={()=>navigation.navigate('ListScreen')}
        title="Rastreamento"
        color="green"
      />
    </View>
  );
}
