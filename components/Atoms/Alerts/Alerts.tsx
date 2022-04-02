import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { pl } from '../../../languages/pl';
import { en } from '../../../languages/en';
import { ja } from '../../../languages/jp';

import { Alert, CloseIcon, Collapse, HStack, IconButton, Text, VStack } from "native-base";
import { useState } from 'react';

type AlertsType = {
  valueFields: string
};

export const Alerts = ({ valueFields }: AlertsType) => {
  i18n.fallbacks = true;
  i18n.translations = { en, ja, pl };
  i18n.locale = Localization.locale;

  const [show, setShow] = useState(true);


  const switchAlert = (valueFields: string) => {
    let status: string;

    switch (valueFields) {
      case i18n.t('DeletionFile.deleted'):
      case i18n.t('NavForm.statusLogin'):
      case i18n.t('NavForm.successInfoRegistration'):
      case i18n.t('PasswordAccount.success'):
      case i18n.t('Forgotten.success'):
      case i18n.t('AnotherForm.uploadFile'):
      case i18n.t('Account.profile.successSending'):
        return status = 'success';
      case i18n.t('DeletionFile.deleting'):
      case 'Upload is running':
        return status = 'info';
      case i18n.t('NavForm.unVerified'):
      case i18n.t('PasswordAccount.differentPasswords'):
      case 'Upload is paused':
        return status = 'warning';
      case 'Nie usunięto pliku.':
      case i18n.t('AnotherForm.tooLongTime'):
      case i18n.t('AnotherForm.tooBigFile'):
      case i18n.t('NavForm.notExist'):
      case i18n.t('NavForm.setErrorMessageLogin'):
      case i18n.t('NavForm.theSameEmail'):
      case i18n.t('AnotherForm.notUploadFile'):
      case i18n.t('error'):
        return status = 'error';
    }
  };

  const switchAlertColor = (valueFields: string) => {
    let color: string;

    switch (valueFields) {
      case i18n.t('DeletionFile.deleted'):
      case i18n.t('NavForm.statusLogin'):
      case i18n.t('NavForm.successInfoRegistration'):
      case i18n.t('PasswordAccount.success'):
      case i18n.t('Forgotten.success'):
      case i18n.t('AnotherForm.uploadFile'):
      case i18n.t('Account.profile.successSending'):
        return color = 'green';
      case i18n.t('DeletionFile.deleting'):
      case 'Upload is running':
        return color = 'blue';
      case i18n.t('NavForm.unVerified'):
      case i18n.t('PasswordAccount.differentPasswords'):
      case 'Upload is paused':
        return color = 'yellow';
      case 'Nie usunięto pliku.':
      case i18n.t('AnotherForm.tooLongTime'):
      case i18n.t('AnotherForm.tooBigFile'):
      case i18n.t('NavForm.notExist'):
      case i18n.t('NavForm.setErrorMessageLogin'):
      case i18n.t('NavForm.theSameEmail'):
      case i18n.t('AnotherForm.notUploadFile'):
      case i18n.t('error'):
        return color = 'red';
    }
  };

  return (
    <Collapse isOpen={show}>
      <Alert w={350} h={!show ? 0 : 'auto'} padding={!show ? 0 : 3} status={switchAlert(valueFields)} colorScheme={switchAlertColor(valueFields)}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="2" alignSelf='center' m={2} />
              <Text fontSize="xl" alignSelf='center' color="coolGray.800">
                {valueFields}
              </Text>
            </HStack>
            <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} alignSelf='center' onPress={() => setShow(false)} />
          </HStack>
        </VStack>
      </Alert>
    </Collapse>
  )
};