import { View, Text } from 'react-native';
import { Map } from './components/Map';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';

export const Main = () => {
  useDeviceContext(tw);
  return (
    <View style={tw`flex h-full w-full`}>
      <StatusBar style='auto' />
      <Map/>
    </View>
  );
}
