import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { SchemaValidation } from '../shemasValidation/schemaValidation';

import { globalColors } from '../styles/variables';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FormType, UserDataType } from 'types/global.types';
import { useNavigation } from '@react-navigation/native';

export const Create = () => {
  const [valuesFields, setValuesFields] = useState<string>('');

  const initialValues = {
    email: '',
    password: ''
  };

  const schemaFile = Yup.object({
    email: SchemaValidation().email,
    password: SchemaValidation().password
  });

  const navigation = useNavigation()

  const actionCodeSettings = { url: `${process.env.NEXT_PUBLIC_NEW_USER}` };

  const register = useCallback(async ({
    email,
    password
  }: UserDataType, { resetForm }: FormType) => {
    auth.useDeviceLanguage();
    // setIsLoading(true);
    createUserWithEmailAndPassword(auth, email!, password!)
    .then((userCredential) => {
      console.log('Registered with:', userCredential.user.email);
      resetForm(initialValues);
      sendEmailVerification(auth.currentUser!, actionCodeSettings);
      setValuesFields('data?.NavForm?.successInfoRegistration');
    })
    .catch((e) => {
      e.code === 'auth/email-already-in-use' ? setValuesFields('data?.NavForm?.theSameEmail') : setValuesFields('data?.error');
      
    });
    // setIsLoading(false);
  }, ['data?.NavForm?.theSameEmail', 'data?.NavForm?.successInfoRegistration']);

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={schemaFile}
    onSubmit={register}
  >
  {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
      <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>
            Register
          </Text>  

        <TextInput
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder='email'
          placeholderTextColor={globalColors.$dark__color__light__back}
          style={styles.input}
        />    

      { 
        (errors.email && touched.email && errors.email) &&
          <Text 
            style={styles.error}
          >
            { errors.email }
          </Text> 
      }

      <TextInput
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        style={styles.input}
        placeholder='password'
        placeholderTextColor={globalColors.$dark__color__light__back}
        secureTextEntry
      />

      { 
        (errors.password && touched.password && errors.password) &&
          <Text 
            style={styles.error}
          >
            { errors.password }
          </Text> 
      }      

      <TouchableOpacity
        style={styles.button}
        // @ts-ignore
        onPress={handleSubmit}
        accessibilityLabel="register button"
      >
        <Text style={styles.textButton}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        // @ts-ignore
        onPress={() => navigation.replace('Login')}
        accessibilityLabel="login button"
      >
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>

        
      {/* </View> */}
      </KeyboardAvoidingView>
    )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.$another__color
  },
  title: {
    fontSize: 36,
    margin: 20,
    color: globalColors.$dark__color__light__back
  },
  input: {
    width: 260,
    height: 40,
    borderRadius: 20,
    fontSize: 20,
    color: globalColors.$primary__color,
    backgroundColor: globalColors.$third__color,
    margin: 20,
    padding: 10
  },
  error: {
    fontSize: 25,
    lineHeight: 40,
    marginVertical: 15,
    marginHorizontal: 'auto',
    paddingHorizontal: 100,
    color: globalColors.$required__color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 40,
    fontSize: 22,
    margin: 10,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.$third__color,
    borderRadius: 20
  },
  textButton: {
    fontSize: 22,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 0,
    color: globalColors.$primary__color
  },
})