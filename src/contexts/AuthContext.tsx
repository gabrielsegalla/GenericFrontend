import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  authenticated: boolean | null;
  login: () => void;
  logout: () => void;
  authorities: any;
  name: string;
  setName: any;
  setAuthorities: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const [authorities, setAuthorities] = useState<any | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuthenticated(true);
      setName(Cookies.get('name'))
      setAuthorities(Cookies.get('authorities'));
    } else {
      setAuthenticated(false);
      setName('')
      setAuthorities('');
    }

    const handleCookieChange = () => {
      const updatedToken = Cookies.get('token');
      if (updatedToken) {
        setAuthenticated(true);
        setName(Cookies.get('name'));
        setAuthorities(Cookies.get('authorities'));
      } else {
        setAuthenticated(false);
        setName('');
        setAuthorities('');
      }
    };
    
    // Registre o ouvinte de evento.
    window.addEventListener('storage', handleCookieChange);

    // Remova o ouvinte de evento quando o componente for desmontado.
    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, []);

  const login = () => {
    setAuthenticated(true);
    setName(Cookies.get('name'))
    setAuthorities(Cookies.get('authorities'));
  };

  const logout = () => {
    setAuthenticated(false);
    setName('')
    setAuthorities('');
  };


  return (
    <AuthContext.Provider value={{ authenticated, login, logout, authorities, name, setName, setAuthorities  }}>
      {children}
    </AuthContext.Provider>
  );
};




export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};






