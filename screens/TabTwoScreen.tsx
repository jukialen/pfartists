import { global__styles, dark__mode } from '../types/global';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={global__styles.container}>
      <Text style={global__styles.title}>Tab Two</Text>

      <View style={global__styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </ScrollView>
  );
}
