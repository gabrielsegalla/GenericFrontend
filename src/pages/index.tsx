import Head from 'next/head'
import { Button, Input, Layout } from 'antd';
import useAuth from './components/hook/useAuth';
import {useTranslations} from 'next-intl';
import { Container, Row, Col } from 'reactstrap';
import { UilArrowCircleRight, UilAngleDown, UilHourglass, UilFeedback, UilGrin, UilMoon   } from '@iconscout/react-unicons'
import { useEffect, useRef, useState } from 'react';



export default function Home(props) {

  const t = useTranslations('Index');
  const { authenticated } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    setIsAuthenticated(authenticated) 
  },[authenticated])

  
  
  return (
    <>
      <Head>
        <title>GD</title>
      </Head>
      
      <Layout style={{background: 'transparent'}}>
        
        <Row className='mainSection' style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Col>
            <Container fluid>
              <h1>{t('title')}</h1>
              <p style={{width: 500}}>{t('description')}</p>
              {!isAuthenticated  ? (
                <>
                <Row style={{backgroundColor: '#ffa200', borderRadius: 10, marginTop: 15, width: 500, height: 100, padding: 20, color: '#fff'}}>
                  <p>{t('instructionsLogin.description1')} <b><a>{t('instructionsLogin.description2')}</a></b>{t('instructionsLogin.description3')}</p>
                  <p>{t('instructionsLogin.admin')}</p>
                  <p>{t('instructionsLogin.user')}</p>
                </Row>

                <Row style={{backgroundColor: '#008cff', borderRadius: 10, marginTop: 15, width: 500, height: 80, padding: 20 , color: '#fff'}}>
                  <p>{t('instructionCreateAccount.description')}</p>
                  <a href="account/register" style={{color: '#fff'}}><b>{t('instructionCreateAccount.link')}</b></a>
                </Row>
                </>
              ):(
                <Row style={{backgroundColor: '#1be480', borderRadius: 10, marginTop: 15, width: 500, height: 80, padding: 20 , color: '#fff'}}>
                  <p>Você está logado como <b>Admin</b></p>
                  
                </Row>
              )}
              
              
            </Container>
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