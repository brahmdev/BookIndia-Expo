import I18n from 'react-native-i18n'; // You can import i18n-js as well if you don't want the app to set default locale from the device locale.

import en from '../translations/en.json';

I18n.locale = 'en';
I18n.fallbacks = true;
I18n.translations = { en };

export default I18n;
