import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { Map } from './pages/Map';

//TODO: Create button component with <ActivityIndicator/> to wait loading
//TODO: Add tracking in real time
//TODO: Add filter markers by date

export default function Page() {
  useDeviceContext(tw);
  return (
    <View style={tw`relative flex h-full w-full bg-black`}>
      <StatusBar style='light' />
      <Map/>
    </View>
  );
}
