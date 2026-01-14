let currentLocale = "en";

const listeners = new Set();

export function getLocale() {
  return currentLocale;
}

export function setLocale(locale) {
  if (locale === currentLocale) return;

  currentLocale = locale;
  listeners.forEach(fn => fn(locale));
}

export function onLocaleChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

