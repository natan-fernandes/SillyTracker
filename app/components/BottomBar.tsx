import tw from 'twrnc';
import * as Crypto from 'expo-crypto';
import * as Location from 'expo-location';
import { markerStorage } from '../data/markerStorage';
import { View, Text, TouchableOpacity } from 'react-native'

export const BottomBar = () => {
  const addMarker = async () => {
    const location = await Location.getCurrentPositionAsync();
    markerStorage.add({
      ...location.coords,
      id: Crypto.randomUUID()
    });
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
