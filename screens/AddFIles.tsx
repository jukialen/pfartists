import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable, UploadTask, UploadTaskSnapshot } from 'firebase/storage';
import { addDoc, CollectionReference } from 'firebase/firestore';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { pl } from '../languages/pl';
import { en } from '../languages/en';
import { ja } from '../languages/jp';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SchemaValidation } from '../shemasValidation/schemaValidation';

import { animationsCollectionRef, photosCollectionRef, videosCollectionRef } from '../references/referencesFirebase';

import { FormType } from 'types/global.types';
import { globalColors } from '../styles/variables';


// import { FormError } from '../../../../../components/molecules/FormError/FormError';
import { Alerts } from '../components/Atoms/Alerts/Alerts';
// import { Progress } from '@chakra-ui/react';

type FileDataType = {
  tags: string
};

const initialValues = {
  tags: ''
};

export const AddFiles = () => {
  const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer | ImagePicker.ImageInfo | null>(null);
  const [valuesFields, setValuesFields] = useState<string>('');
  const [progressUpload, setProgressUpload] = useState<number>(0);
  const [tag, setTags] = useState<string>('');

  i18n.fallbacks = true;
  i18n.translations = { en, ja , pl };
  i18n.locale = Localization.locale;

  const user = auth.currentUser;
  
  const tagsArray = [
    { tag: i18n.t('chooseTag'), value: '' },
    { tag: i18n.t('Aside.realistic'), value: 'Realistic' },
    { tag: i18n.t('Aside.manga'), value: 'Manga' },
    { tag: i18n.t('Aside.anime'), value: 'Anime' },
    { tag: i18n.t('Aside.comics'), value: 'Comics' },
    { tag: i18n.t('Aside.photographs'), value: 'Photographs' },
    { tag: i18n.t('Aside.videos'), value: 'Videos' },
    { tag: i18n.t('Aside.animations'), value: 'Animations' },
    { tag: i18n.t('Aside.others'), value: 'Others' }
  ];
  
  const schemaFile = Yup.object({
    tags: SchemaValidation().tags,
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync()
 
    if (!result.cancelled) {
      setFile(result);
    }
  };
  
  const uploadFiles = async ({ tags }: FileDataType, { resetForm }: FormType) => {
          // @ts-ignore
    const { uri } = file;
      const split = uri.split('/')
      const fileName = split[split.length - 1]

    // @ts-ignore
    const photosRef = ref(storage, `${user?.uid}/photos/${fileName}`);
    // @ts-ignore
    const videosRef = ref(storage, `${user?.uid}/videos/${fileName}`);
    // @ts-ignore
    const animationsRef = ref(storage, `${user?.uid}/animations/${fileName}`);

      
    let upload: UploadTask;

    switch (tags) {
      case `Animations`:
        upload = uploadBytesResumable(animationsRef, uri);
        break;
      case `Videos`:
        upload = uploadBytesResumable(videosRef, uri);
        break;
      default:
        upload = uploadBytesResumable(photosRef, uri);
    }
  
    let refName: string;

    upload.on('state_changed', (snapshot: UploadTaskSnapshot) => {
        const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressUpload(progress);
      
        switch (snapshot.state) {
          case 'running':
            setValuesFields('Upload is running');
            return refName = snapshot.ref.name;
          case 'paused':
            setValuesFields('Upload is paused');
            break;
        }
      }, (e: Error) => {
        console.error(e);
        setValuesFields(i18n.t('AnotherForm.notUploadFile'));
      },
      async () => {
        const sendToFirestore = (colRef: CollectionReference, url: string) => {
          addDoc(colRef, {
            fileUrl: url,
            description: refName,
            tag: tags,
            timeCreated: Date.now(),
            uid: user?.uid
          });
          setValuesFields(i18n.t('AnotherForm.uploadFile'));
          setFile(null);
          resetForm(initialValues);
        };
        
        switch (tags) {
          case i18n.t('Aside.animations'):
            const animationURL = await getDownloadURL(animationsRef);
            sendToFirestore(animationsCollectionRef(), animationURL);
            break;
          case i18n.t('Aside.videos'):
            const videoURL = await getDownloadURL(videosRef);
            sendToFirestore(videosCollectionRef(), videoURL);
            break;
          default:
            const photoURL = await getDownloadURL(photosRef);
            sendToFirestore(photosCollectionRef(), photoURL);
        }
      });
  };

  console.log(tag)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemaFile}
      onSubmit={uploadFiles}
    >
    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
       <View style={styles.container}>
         <Text style={styles.title}>
          {i18n.t('AnotherForm.fileTitle')}
          </Text>
      
         <Picker
            style={styles.picker}
            enabled={true} 
            mode="dropdown"
            selectedValue={tag}
            onValueChange={(itemValue, itemIndex) => {
              setTags(itemValue)
              setFieldValue('tags', itemValue)       
            }}>
              {tagsArray.map((tags) => 
              <Picker.Item 
                label={tags.tag} 
                value={tags.value} 
                key={tags.tag}
              />)
              }
          </Picker>

          { errors.tags && <Text style={styles.error}>{errors.tags}</Text> }
      
           <TouchableOpacity
            style={styles.buttonFile}
            // @ts-ignore
            onPress={pickImage}
            accessibilityLabel="button submit a file to storage"
          >
           <Text style={[styles.textButton, styles.textFile]}>
             {i18n.t('AnotherForm.fileInput')}
             </Text>
         </TouchableOpacity>

         <TouchableOpacity
          style={styles.button}
          // @ts-ignore
          onPress={handleSubmit}
          accessibilityLabel="button submit a file to storage"
         >
          <Text style={styles.textButton}>
            {i18n.t('AnotherForm.send')}
          </Text>
         </TouchableOpacity>
        {/* { 
          progressUpload >= 1 && !(valuesFields === i18n.t('AnotherForm.uploadFile')) &&
          <Progress
            value={progressUpload}
            colorScheme='green'
            isAnimated
            hasStripe
            min={0}
            max={100}
            w={280}
            bg='blue.400'
            m='1.5rem auto'
            size='md'
          />
        } */}
  
        { valuesFields !== '' && <Alerts valueFields={valuesFields} /> }
       </View>
     )}
    </Formik>
  );
};

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
    color: globalColors.$primary__color,
    justifyContent: 'center',
  },
  picker: {
    width: 250,
    maxHeight: 100,
    marginVertical: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderColor: globalColors.$secondary__color,
    backgroundColor: globalColors.$third__color
  },
  button: {
    width: 80,
    height: 80,
    margin: 27,
    alignItems: 'center',
    backgroundColor: globalColors.$another__color,
    borderStyle: 'solid',
    borderWidth: 2.5,
    borderColor: globalColors.$another__color,
    borderRadius: 80
  },
  textButton: {
    width: '100%',
    height: '100%',
    fontSize: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: globalColors.$dark__background__light__color,
    textAlign: 'center',
    paddingVertical: 25
  },
  buttonFile: {
    width: 250,
    height: 45,
    margin: 20,
    padding: 5,
    borderWidth: .5,
    borderColor: globalColors.$third__color,
    backgroundColor: globalColors.$third__color
  },
  textFile: {
    width: 200,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 1,
    borderColor: globalColors.$third__color,
    backgroundColor: globalColors.$third__color,
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
