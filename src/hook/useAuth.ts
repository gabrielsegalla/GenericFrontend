import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthentication = () => {
    const token = Cookies.get('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();

    // Defina um intervalo para verificar periodicamente os cookies.
    const interval = setInterval(checkAuthentication, 1000); // Ajuste o intervalo conforme necessário.

    // Limpe o intervalo quando o componente for desmontado.
    return () => clearInterval(interval);
  }, []);

  return { authenticated };
};

export default useAuth;
