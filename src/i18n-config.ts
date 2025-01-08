export const i18n = {
  locales: [
    { code: 'en-US', name: 'English', icon: '🇺🇸' },
    { code: 'fr', name: 'Français', icon: '🇫🇷' },
    { code: 'ar', name: 'العربية', icon: '🇸🇦' },
    { code: 'tr', name: 'Türkçe', icon: '🇹🇷' },
    { code: 'de', name: 'Deutsch', icon: '🇩🇪' },
    { code: 'es', name: 'Español', icon: '🇪🇸' },
    { code: 'it', name: 'Italiano', icon: '🇮🇹' },
    { code: 'az', name: 'Azərbaycan', icon: '🇦🇿' },
    { code: 'ru', name: 'Русский', icon: '🇷🇺' },
    { code: 'zh', name: '中文', icon: '🇨🇳' },
  ],
  defaultLocale: 'tr',
}

export const getDirection = (locale: string) => {
  return locale === 'ar' ? 'rtl' : 'ltr'
}
export type I18nConfig = typeof i18n
export type Locale = I18nConfig['locales'][number]
