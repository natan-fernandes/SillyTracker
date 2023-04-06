import tw from 'twrnc';
import { DateTime } from 'luxon';
import { Marker } from '../types';
import * as Crypto from 'expo-crypto';
import * as Location from 'expo-location';
import { markerStorage } from '../data/markerStorage';
import { View, Text, TouchableOpacity } from 'react-native'

interface BottomBarProps {
  markers: Marker[],
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>
}

export const BottomBar = (props: BottomBarProps) => {
  const addMarker = async () => {
    const location = await Location.getCurrentPositionAsync();
    const marker: Marker = {
      ...location.coords,
      id: Crypto.randomUUID(),
      createdAt: DateTime.now().toSeconds()
    }

    markerStorage.add(marker);
    props.setMarkers([...props.markers, marker]);
  }

  return (
    <View style={tw`absolute z-10 bottom-5 h-20 w-full flex items-center justify-center`}>
      <TouchableOpacity 
        style={tw`bg-red-700 flex justify-center items-center p-3 rounded-lg`}
        onPress={addMarker}  
      >
        <Text style={tw`text-slate-100`}>
          Adicionar marcador na posição atual
        </Text>
      </TouchableOpacity>
    </View>
  )
}
