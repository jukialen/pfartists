import * as Yup from 'yup';

export const SchemaValidation = () => {
  
  const username = Yup.string()
  .matches(/^[A-Z]/g, 'First letter must be a big.')
  .matches(/[a-ząćęłńóśźżĄĘŁŃÓŚŹŻぁ-んァ-ヾ一-龯]*/g, 'Name accept only letters. These can be Hiragana, Katakana and kanji characters')
  .matches(/\D/g, 'Name cannot include numbers.')
  .min(3, 'Name is too short.')
  .required('Required');
  
  const pseudonym = Yup.string()
  .matches(/[0-9０-９]+/g, 'Name cannot include numbers.')
  .matches(/[#?!@$%^&*-＃？！＄％＆＊ー]+/g, 'Pseudonym must include at least 1 special character: #?!@$%^&*-＃？！＄％＆＊ー')
  .matches(/[a-ząćęłńóśźżĄĘŁŃÓŚŹŻぁ-んァ-ヾ一-龯]*/g, 'Pseudonym accept only letters. These can be Hiragana, Katakana and kanji characters')
  .min(5, 'Pseudonym is too short.')
  .max(15, 'Pseudonym is too long. Must have a maximum 15 letters.')
  .required('Required');
  
  const email = Yup.string()
  .email('Invalid email')
  .required('Required');
  
  const password = Yup.string()
  .min(9, 'Password is too short. Must have a minimum 9 letters.')
  .matches(/[A-Z]+/g, 'Password must have at least 1 bid letter.')
  .matches(/[a-ząćęłńóśźżĄĘŁŃÓŚŹŻぁ-んァ-ヾ一-龯]*/g, 'Password accept only letters. These can be Hiragana, Katakana and kanji characters.')
  .matches(/[0-9]+/g, 'Password must have at least 1 number.')
  .matches(/[#?!@$%^&*-]+/g, 'Password must include at least 1 special character: #?!@$%^&*-')
  .required('Required');
  
  const description = Yup.string()
    .required('Required');
  
  const tags = Yup.string().required('Required');
  
  return {
    username,
    pseudonym,
    email,
    password,
    description,
    tags
  };
};
