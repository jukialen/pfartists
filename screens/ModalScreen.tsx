import { StatusBar } from 'expo-status-bar';
import { Platform , Button, Pressable, StyleSheet} from 'react-native';
import { global__styles, dark__mode } from '../types/global';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { globalColors } from '../styles/variables';

export default function ModalScreen() {

  const sign__out = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={global__styles.container}>
      <Text style={global__styles.title}>Modal</Text>
      <View style={global__styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      <Pressable
        style={styles.button}
        onPress={sign__out}
      >
        <Text style={styles.textButton}>Sign out</Text>
      </Pressable>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    margin: 15,
    justifyContent: 'center'
  },
  button: {
    width: 100,
    height: 40,
    fontSize: 22,
    margin: 10,
    padding: 7,
    alignItems: 'center',
    backgroundColor: globalColors.$primary__color,
    borderRadius: 20
  },
  textButton: {
    fontSize: 22,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 0,
    color: '#333'
  },
  input: {
    width: 260,
    height: 40,
    borderRadius: 20,
    fontSize: 20,
    backgroundColor: '#ddf',
    margin: 20,
    padding: 10
  },
  error: {
    fontSize: 25,
    marginVertical: 15,
    marginHorizontal: 'auto',
    color: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#60000000'
  }
})