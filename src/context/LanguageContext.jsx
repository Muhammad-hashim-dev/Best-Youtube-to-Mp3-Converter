import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import en from "../locales/en";
import el from "../locales/el";
import ja from "../locales/ja";

const LanguageContext = createContext(null);

const translations = {
  en,
  el,
  ja,
};

const STORAGE_KEY = "clearaudio-language";

const getInitialLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
  } catch {
    // Ignore localStorage errors
  }

  return "en";
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = (newLanguage) => {
    if (!translations[newLanguage]) {
      return;
    }

    setLanguageState(newLanguage);

    try {
      localStorage.setItem(STORAGE_KEY, newLanguage);
    } catch {
      // Ignore localStorage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside a LanguageProvider"
    );
  }

  return context;
}

export default LanguageContext;