import { getLocale } from "./localeStore.js";
import DefaultStrings from "./defaults.js";

const locales = {
  en: DefaultStrings
};

export function getDefaultStrings() {
  const locale = getLocale();
  const DefaultsClass = locales[locale] || DefaultStrings;
  return new DefaultsClass();
}
