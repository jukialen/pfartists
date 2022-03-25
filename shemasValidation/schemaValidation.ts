import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { pl } from '../languages/pl';
import { en } from '../languages/en';
import { ja } from '../languages/jp';
import * as Yup from 'yup';

export const SchemaValidation = () => {
  i18n.fallbacks = true;
  i18n.translations = { en, ja , pl };
  i18n.locale = Localization.locale;

  const username = Yup.string()
  .matches(/^[A-Z]/g, i18n.t('NavForm.validateUsernameFl'))
  .matches(/[a-ząćęłńóśźżĄĘŁŃÓŚŹŻぁ-んァ-ヾ一-龯]*/g, i18n.t('NavForm.validateUsernameHKik'))
  .matches(/\D/g, i18n.t('NavForm.validateUsernameNum'))
  .min(3, i18n.t('NavForm.validateUsernameMin'))
  .required(i18n.t('NavForm.validateRequired'));
  
  const pseudonym = Yup.string()
  .matches(/[0-9０-９]+/g, i18n.t('NavForm.validateUsernameNum'))
  .matches(/[#?!@$%^&*-＃？！＄％＆＊ー]+/g, i18n.t('NavForm. validatePseudonymSpec'))
  .matches(/[a-ząćęłńóśźżĄĘŁŃÓŚŹŻぁ-んァ-ヾ一-龯]*/g, i18n.t('NavForm.validatePseudonymHKik'))
  .min(5, i18n.t('NavForm.validatePseudonymMin'))
  .max(15, i18n.t('NavForm.validatePseudonymMax'))
  .required(i18n.t('NavForm.validateRequired'));
  
  const email = Yup.string()
  .email(i18n.t('NavForm.validateEmail'))
  .required(i18n.t('NavForm.validateRequired'));
  
  const password = Yup.string()
  .min(9, i18n.t('NavForm.validatePasswordNum'))
  .matches(/[A-Z]+/g, i18n.t('NavForm.validatePasswordOl'))
  .matches(/[a-ząćęłńóśźżĄĘŁŃÓŚŹŻぁ-んァ-ヾ一-龯]*/g, i18n.t('NavForm.validatePasswordHKik'))
  .matches(/[0-9]+/g, i18n.t('NavForm.validatePasswordOn'))
  .matches(/[#?!@$%^&*-]+/g, i18n.t('NavForm.validatePasswordSpec'))
  .required(i18n.t('NavForm.validateRequired'));
  
  const description = Yup.string()
    .required(i18n.t('NavForm.validateRequired'));
  
  const tags = Yup.string().required(i18n.t('NavForm.validateRequired'));
  
  return {
    username,
    pseudonym,
    email,
    password,
    description,
    tags
  };
};
