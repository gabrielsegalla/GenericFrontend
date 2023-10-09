import type { AppProps } from 'next/app'
import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import 'react-toastify/dist/ReactToastify.css';

import {NextIntlClientProvider} from 'next-intl';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <Navbar />
      <ToastContainer />
      <Component {...pageProps} />
    </NextIntlClientProvider>
    
  )
}

