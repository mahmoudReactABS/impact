import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './languages/en.json';
import arabic from './languages/ar.json';

const resources = {
  en: {
    translation: english,
  },
  ar: {
    translation: arabic,
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;