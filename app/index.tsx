import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { Map } from './pages/Map';


export default function Page() {
  useDeviceContext(tw);
  return (
    <View style={tw`relative flex h-full w-full`}>
      <StatusBar style='auto' />
      <Map/>
    </View>
  );
}
