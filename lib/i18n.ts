import ua from '@/i18n/ua.json';
import ru from '@/i18n/ru.json';
import en from '@/i18n/en.json';

const translations = { ua, ru, en };

export type Lang = 'ua' | 'ru' | 'en';

export function getT(lang: string) {
  const l = (translations[lang as Lang] ? lang : 'ua') as Lang;
  return translations[l];
}