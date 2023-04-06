import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { Map } from './pages/Map';

//TODO: Add tracking in real time
//TODO: Create button component with <ActivityIndicator/> to wait loading

export default function Page() {
  useDeviceContext(tw);
  return (
    <View style={tw`relative flex h-full w-full bg-black`}>
      <StatusBar style='light' />
      <Map/>
    </View>
  );
}
