import { Layout } from 'antd';
import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {

  const { Content, Footer } = Layout;




  return(
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="Gabriel Rodrigues Segalla"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      </Head>
      <body>
        <Layout>
          <Content style={{  minHeight: '100vh' }}>
            <Main/>
            <NextScript/>
            <Footer style={{ textAlign: 'center'}}>footer</Footer>
          </Content>
        </Layout>
      </body>
    </Html>
  )
}


