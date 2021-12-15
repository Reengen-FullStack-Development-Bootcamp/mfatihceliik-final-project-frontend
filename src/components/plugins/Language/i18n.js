import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tr from './tr'
import en from './en'

Vue.use(VueI18n)

const messages = {
  en: en,
  tr: tr
}

// Create VueI18n instance with options
export default  new VueI18n({
  locale: localStorage.getItem('lang'), // set locale
  messages, // set locale messages
})