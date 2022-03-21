import { global__styles, dark__mode } from '../types/global';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types/types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={global__styles.container}>
      <Text style={global__styles.title}>Home</Text>
      <View style={global__styles.separator} lightColor="#eee" darkColor="rgba(0,255,255,0.1)" />
      <EditScreenInfo path="/screens/Menu.tsx" />
    </View>
  );
}