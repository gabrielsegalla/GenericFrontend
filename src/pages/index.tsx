import Head from 'next/head'
import { Layout } from 'antd';
import {useTranslations} from 'next-intl';
import { Row, Col } from 'reactstrap';
import { useEffect } from 'react';
import Image from 'next/image';
import Logo from '../assets/LogoGeneric.png'
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';



export default function Home(props) {

  const t = useTranslations('Index');
  const { authenticated, name} = useAuth();

  const router = useRouter();
  
  const refreshKey = router.query.refresh || null;

  useEffect(() => {
    // Force the page to reload when the refresh key changes
    if (refreshKey) {
      location.reload();
    }
  }, [refreshKey]);
  
  
  return (
    <>
      <Head>
        <title>GD</title>
      </Head>
      
      <Layout style={{background: 'transparent'}}>
        
        <Row className='mainSection' style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Col md={5}>
            <Image src={Logo} alt={"Generic Project"} style={{width: '100%', height: 'auto'}}/>
          </Col>
          <Col style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
              <h1>{t('title')}</h1>
              <p style={{width: 500}}>{t('description')}</p>
              {!authenticated  ? (
                <>
                  <Row style={{backgroundColor: '#ffa200', borderRadius: 10, marginTop: 15, width: 500, padding: 20, color: '#fff'}}>
                    <p>{t('instructionsLogin.description1')} <b><a>{t('instructionsLogin.description2')}</a></b>{t('instructionsLogin.description3')}</p>
                    <p>{t('instructionsLogin.admin')}</p>
                    <p>{t('instructionsLogin.user')}</p>
                  </Row>

                  <Row style={{backgroundColor: '#008cff', borderRadius: 10, marginTop: 15, width: 500,  padding: 20 , color: '#fff'}}>
                    <p>{t('instructionCreateAccount.description')}</p>
                    <a href="account/register" style={{color: '#fff'}}><b>{t('instructionCreateAccount.link')}</b></a>
                  </Row>
                </>
              ):(
                <Row style={{backgroundColor: '#1be480', borderRadius: 10, marginTop: 15, width: 500,  padding: 20 , color: '#fff'}}>
                  <p>Você está logado como <b>{name}</b></p>
                </Row>
              )}
          </Col>
        </Row>
      </Layout>
    </>
  )
}


export async function getStaticProps(context) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default
    }
  };
}