import { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { UploadTaskSnapshot } from '@firebase/storage';
import { addDoc, CollectionReference } from 'firebase/firestore';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SchemaValidation } from '../shemasValidation/schemaValidation';

import { animationsCollectionRef, photosCollectionRef, videosCollectionRef } from 'references/referencesFirebase';

import { EventType, FormType } from 'types/global.types';

// import { useHookSWR } from '../hooks/useHookSWR';

// import { FormError } from '../../../../../components/molecules/FormError/FormError';
// import { Alerts } from 'components/atoms/Alerts/Alerts';

// import styles from './FileUpload.module.scss';
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
  // const data = useHookSWR();
  const [tag, setTags] = useState<string>('');

  const user = auth.currentUser;
  
  const tagsArray = [
    { tag: `Choose tag`, value: '' },
    { tag: `Realistic`, value: 'Realistic' },
    { tag: `Manga`, value: 'Manga' },
    { tag: `Anime`, value: 'Anime' },
    { tag: `Comics`, value: 'Comics' },
    { tag: `Photographs`, value: 'Photographs' },
    { tag: `Videos`, value: 'Videos' },
    { tag: `Animations`, value: 'Animations' },
    { tag: `Others`, value: 'Others' }
  ];
  
  const schemaFile = Yup.object({
    tags: SchemaValidation().tags,
  });
  
  // const handleChange = async (e: EventType) => {
  //   e.target.files?.[0] && setFile(e.target.files[0]);
  // };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: .2,
      exif: true
    });

    console.log('res',result);

    if (!result.cancelled) {
      setFile(result);
    }

  };
  
  const uploadFiles = async ({ tags }: FileDataType, { resetForm }: FormType) => {
    // @ts-ignore
    const photosRef = ref(storage, `${user?.uid}/photos/${file?.name}`);
    // @ts-ignore
    const videosRef = ref(storage, `${user?.uid}/videos/${file?.name}`);
    // @ts-ignore
    const animationsRef = ref(storage, `${user?.uid}/animations/${file?.name}`);
      // @ts-ignore
    const { uri } = file;

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
  
    console.log(file)
    console.log(tags)
    let refName: string;

    // upload.on('state_changed', (snapshot: UploadTaskSnapshot) => {
    //     const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setProgressUpload(progress);
      
    //     switch (snapshot.state) {
    //       case 'running':
    //         setValuesFields('Upload is running');
    //         return refName = snapshot.ref.name;
    //       case 'paused':
    //         setValuesFields('Upload is paused');
    //         break;
    //     }
    //   }, (e: Error) => {
    //     console.error(e);
    //     setValuesFields(`${data?.AnotherForm?.notUploadFile`);
    //   },
    //   async () => {
    //     const sendToFirestore = (colRef: CollectionReference, url: string) => {
    //       addDoc(colRef, {
    //         fileUrl: url,
    //         description: refName,
    //         tag: tags,
    //         timeCreated: Date.now(),
    //         uid: user?.uid
    //       });
    //       setValuesFields(`${data?.AnotherForm?.uploadFile}`);
    //       setFile(null);
    //       resetForm(initialValues);
    //     };
        
    //     switch (tags) {
    //       case `${data?.Aside?.animations}`:
    //         const animationURL = await getDownloadURL(animationsRef);
    //         sendToFirestore(animationsCollectionRef(), animationURL);
    //         break;
    //       case `${data?.Aside?.videos}`:
    //         const videoURL = await getDownloadURL(videosRef);
    //         sendToFirestore(videosCollectionRef(), videoURL);
    //         break;
    //       default:
    //         const photoURL = await getDownloadURL(photosRef);
    //         sendToFirestore(photosCollectionRef(), photoURL);
    //     }
    //   });
  };
  
  // const managedUpload = (state: string) => {
  //   switch (state) {
  //     case 'PAUSE':
  //       uploadBytesResumable(photosRef, file!).pause();
  //       console.log(' Blob | Uint8Array | ArrayBuffer');
  //       break;
  //     case 'RESUME':
  //       uploadBytesResumable(photosRef, file!).resume();
  //       console.log('File is resumed.');
  //       break;
  //     case 'CANCEL':
  //       uploadBytesResumable(photosRef, file!).cancel();
  //       console.log('File is canceled.');
  //       break;
  //     default:
  //       console.error(`${state} match nothing`);
  //   }
  // };

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
          Adding a file
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
              {tagsArray.map((tags) => <Picker.Item 
              label={tags.tag} 
              value={tags.value} 
              key={tags.tag} />)
              }
          </Picker>

          { errors.tags && <Text style={styles.error}>{errors.tags}</Text> }

           <Button title="Pick an image from camera roll" onPress={pickImage} />
      

         <TouchableOpacity
         style={styles.button}
         // @ts-ignore
         onPress={handleSubmit}
         accessibilityLabel="button submit a file to storage"
         >
           <Text style={styles.textButton}>Send</Text>
         </TouchableOpacity>
       </View>
     )}
        
        {/* <View 
        // className={styles.form__field}
        >
          <Text style={styles.title}>
            {/* {data?.AnotherForm?.file} */}
            {/* Files */}
          {/* </Text> */}
          {/* <Field
            name='file'
            type='file'
            accept='.jpg, .jpeg, .png, .webp, .avif, .webm, .mp4, .apng'
            onChange={handleChange}
            placeholder={data?.AnotherForm?.file}
            // className={styles.input}
            required={true}
          />
        </div> */}
        {/* </View>} */}
    
        
        {/* { progressUpload >= 1 && !(valuesFields ===`${data?.AnotherForm?.uploadFile}`) &&
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
  
        {/* {valuesFields !== '' && <Alerts valueFields={valuesFields} />} */}
        
        {/*<div>*/}
        {/*  <PauseCircleTwoTone className={styles.icons} onClick={() => managedUpload('PAUSE')} />*/}
        {/*  <ReloadOutlined className={styles.icons} onClick={() => managedUpload('RESUME')} />*/}
        {/*  <LoadingOutlined className={styles.icons} onClick={() => managedUpload('CANCEL')} />*/}
        {/*</div>*/}
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
    justifyContent: 'center'
  },
  button: {
    width: 100,
    height: 40,
    fontSize: 22,
    margin: 10,
    padding: 7,
    alignItems: 'center',
    backgroundColor: '#ddf',
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
  picker: {
    width: '60%',
    height: 40,
    borderColor: '#ddf'
  },
  pickerItem: {
    
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
