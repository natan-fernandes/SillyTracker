import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { Map } from './pages/Map';


export default function Page() {
  useDeviceContext(tw);
  return (
    <View style={tw`relative flex h-full w-full bg-black`}>
      <StatusBar style='light' />
      <Map/>
    </View>
  );
}
