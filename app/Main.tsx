import { View, Text } from 'react-native';
import { Map } from './components/Map';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { BottomBar } from './components/BottomBar';

export const Main = () => {
  useDeviceContext(tw);
  return (
    <View style={tw`relative flex h-full w-full`}>
      <StatusBar style='auto' />
      <BottomBar/>
      <Map/>
    </View>
  );
}
