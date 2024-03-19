import i18next from 'i18next'

import { initReactI18next } from 'react-i18next'

import ptTranslations from '../locales/pt.json'

void i18next.use(initReactI18next).init({
  debug: false,
  fallbackLng: 'pt',
  resources: {
    pt: {
      translation: ptTranslations
    }
  },
  lng: 'pt'
})