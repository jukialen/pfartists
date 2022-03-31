import { GithubAuthProvider, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';

import { doc, setDoc } from 'firebase/firestore';
import { Button, Pressable, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const Providers = () => {
  const googleProvider = new GoogleAuthProvider();
  const yahooProvider = new OAuthProvider('yahoo.com');
  const githubProvider = new GithubAuthProvider();
  
  const signInWithProvider = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      // isCreate ? await setDoc(doc(db, 'users', `${auth.currentUser?.uid}), { pseudonym: auth.currentUser?.displayName });
      //: showLoginForm();
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }
  
  return (
    <View style={styles.providers}>
      <Pressable
        style={styles.item}
        aria-label='google provider'
        onPress={() => signInWithProvider(googleProvider)}
      >
        <FontAwesome size={30} style={{ marginBottom: -3 }} name="google" />
      </Pressable>
      
      <Pressable
        style={styles.item}
        aria-label='github provider'
        onPress={() => signInWithProvider(githubProvider)}
      >
        <FontAwesome size={30} style={{ marginBottom: -3 }} name="github" />
      </Pressable>
      <Pressable
        style={styles.item}
        aria-label='yahoo provider'
        onPress={() => signInWithProvider(yahooProvider)}
      >
        <FontAwesome size={30} style={{ marginBottom: -3 }} name="yahoo" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  providers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
    marginHorizontal: 15,
    padding: 10
  },
  item: {
    margin: 15,
    padding: 10
  }
})