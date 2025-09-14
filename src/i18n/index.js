import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr/common.json';
import en from './locales/en/common.json';

const resources = {
  fr: { translation: fr },
  en: { translation: en }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
