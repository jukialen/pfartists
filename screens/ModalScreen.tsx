import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { global__styles, dark__mode } from '../types/global';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={global__styles.container}>
      <Text style={global__styles.title}>Modal</Text>
      <View style={global__styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
