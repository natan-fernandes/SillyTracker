//* https://stackoverflow.com/a/73977534 - Enable TailwindCSS completions

import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { Text, View } from 'react-native';

export default function App() {
  useDeviceContext(tw);
  return (
    <View style={tw`flex h-screen bg-red-600 items-center justify-center`}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}
