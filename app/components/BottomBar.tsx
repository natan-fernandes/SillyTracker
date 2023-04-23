import tw from 'twrnc';
import { DateTime } from 'luxon';
import { Marker } from '../types';
import * as Crypto from 'expo-crypto';
import * as Location from 'expo-location';
import { markerStorage } from '../data/markerStorage';
import { View, Text, TouchableOpacity } from 'react-native'

interface BottomBarProps {
  markers: Marker[],
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>,
  isTracking: boolean,
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>
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
    <View style={tw`absolute z-10 bottom-5 h-20 w-full flex flex-row items-center justify-center gap-4`}>
      <TouchableOpacity 
        style={tw`bg-red-700 flex justify-center items-center p-3 rounded-lg`}
        onPress={addMarker}  
      >
        <Text style={tw`text-slate-100`}>
          Adicionar ponto
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={tw`flex justify-center items-center p-3 rounded-lg ${props.isTracking ? 'bg-red-200' : 'bg-red-700'}`}
        onPress={() => props.setIsTracking(!props.isTracking)}
      >
        <Text style={tw`${props.isTracking ? 'text-red-700 font-semibold' : 'text-slate-100'}`}>
          {
            props.isTracking ? 'Parar rastreamento' : 'Iniciar rastremento'
          }
        </Text>
      </TouchableOpacity>
    </View>
  )
}
