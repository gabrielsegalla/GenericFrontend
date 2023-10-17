import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // Importe a biblioteca js-cookie
import { FlagIcon } from "react-flag-kit";
import { Button } from 'antd';

function LanguageSelector() {
  const router = useRouter();

  const [languageSelected, setLanguageSelected] = useState('')

  useEffect(() => {
    // Verifique se há uma preferência de idioma armazenada em cookies
    const storedLocale = Cookies.get('locale');
    
    setLanguageSelected(storedLocale)
    // Se uma preferência de idioma estiver armazenada, use-a para configurar o idioma
    if (storedLocale) {
      router.push(router.pathname, router.asPath, { locale: storedLocale });
    }
  }, []);

  const changeLanguage = (locale) => {
    setLanguageSelected(locale)
    router.push(router.pathname, router.asPath, { locale });
    Cookies.set('locale', locale); // Armazene a preferência de idioma em cookies
  };

  return (
    <div>
      <a onClick={() => changeLanguage('en-US')} style={{padding: '0px 5px'}}><FlagIcon code="US" size={15} width={22} style={languageSelected != 'en-US' ? {opacity: 0.5} : {}} /></a>
      <a onClick={() => changeLanguage('pt-BR')} style={{padding: '0px 5px'}}><FlagIcon code="BR" size={15} width={22} style={languageSelected != 'pt-BR' ? {opacity: 0.5} : {}} /></a>
    </div>
  );
}

export default LanguageSelector;
