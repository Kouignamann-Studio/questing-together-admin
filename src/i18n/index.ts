import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import fr from './fr';

const savedLang = localStorage.getItem('lang') ?? 'fr';

i18n.use(initReactI18next).init({
  resources: { en, fr },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
