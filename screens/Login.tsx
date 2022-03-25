import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { pl } from '../languages/pl';
import { en } from '../languages/en';
import { ja } from '../languages/jp';
import { Formik } from 'formik'
import * as Yup from 'yup';
import { SchemaValidation } from '../shemasValidation/schemaValidation';

import { FormType, UserDataType } from 'types/global.types';

import { globalColors } from '../styles/variables';

export const Login = () => {
  const [valuesFields, setValuesFields] = useState<string>('');

  i18n.fallbacks = true;
  i18n.translations = { en, ja , pl };
  i18n.locale = Localization.locale;

  const initialValues = {
    email: '',
    password: ''
  };

  const schemaFile = Yup.object({
    email: SchemaValidation().email,
    password: SchemaValidation().password
  });

  const navigation = useNavigation()

  const login = async ({ email, password }: UserDataType, { resetForm }: FormType) => {
    await signInWithEmailAndPassword(auth, email!, password!)
    .then(async (userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log('Logged in with:', user.email);
        resetForm(initialValues);
        setValuesFields(i18n.t('NavForm.statusLogin'));
      
      } else {
        setValuesFields(i18n.t('NavForm.unVerified'));
      }
    })
    .catch((e) => {
      setValuesFields(i18n.t('NavForm?.setErrorMessageLogin'));
      e.code === 'auth/user-not-found' && setValuesFields(i18n.t('NavForm.notExist'))
    });
  };

return (
  <Formik
    initialValues={initialValues}
    validationSchema={schemaFile}
    onSubmit={login}
  >
  {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
      <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>
          {i18n.t('NavForm.titleOfLogin')}
          </Text>  

        <TextInput
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder={i18n.t('NavForm.email')}
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
        placeholder={i18n.t('NavForm.password')}
        placeholderTextColor={globalColors.$dark__color__light__back}
        style={styles.input}
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
          accessibilityLabel="login button"
        >
          <Text style={styles.textButton}>{i18n.t('NavForm.loginSubmit')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        // @ts-ignore
        onPress={() => navigation.replace('Create')}
        accessibilityLabel="register button"
        >
          <Text style={styles.textButton}>{i18n.t('NavForm.createSubmit')}</Text>
        </TouchableOpacity>
        {!!valuesFields && <Text style={styles.error}>{valuesFields}</Text>}

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