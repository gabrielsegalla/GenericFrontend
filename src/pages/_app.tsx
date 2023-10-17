import type { AppProps } from 'next/app'
import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import 'react-toastify/dist/ReactToastify.css';

import {NextIntlClientProvider} from 'next-intl';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  const [name, setName] = useState('');

  
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <Container>
          <Component {...pageProps} />
        </Container>
      </AuthProvider>
    </NextIntlClientProvider>
    
  )
}

