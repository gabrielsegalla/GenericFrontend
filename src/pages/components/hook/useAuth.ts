import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    // Adicione um evento de ouvinte para monitorar mudanças nos cookies.
    const handleCookieChange = () => {
      const updatedToken = Cookies.get('token');
      if (updatedToken) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    // Registre o ouvinte de evento.
    window.addEventListener('storage', handleCookieChange);

    // Remova o ouvinte de evento quando o componente for desmontado.
    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, []);

  return { authenticated };
};

export default useAuth;
