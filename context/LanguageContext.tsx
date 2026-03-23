import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../translation';

type LanguageContextType = {
  locale: string;
  changeLanguage: (code: string) => Promise<void>;
  isLoaded: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  changeLanguage: async () => {},
  isLoaded: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(i18n.locale);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('appLanguage');
        if (savedLanguage) {
          i18n.locale = savedLanguage;
          setLocale(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (code: string) => {
    try {
      i18n.locale = code;
      setLocale(code);
      await AsyncStorage.setItem('appLanguage', code);
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, isLoaded }}>
      {/* We use key={locale} to force a full re-render of children when language changes */}
      <React.Fragment key={locale}>
        {children}
      </React.Fragment>
    </LanguageContext.Provider>
  );
};
