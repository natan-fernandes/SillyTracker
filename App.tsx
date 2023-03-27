import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { View } from 'react-native';

export default function App() {
  useDeviceContext(tw);
  return (
    <View style={tw`flex h-screen w-screen items-center justify-center`}>
      <StatusBar style='auto' />
    </View>
  );
}
