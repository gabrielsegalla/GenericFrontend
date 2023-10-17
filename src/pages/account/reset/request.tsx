import Head from 'next/head'
import useAuth from '../../../hook/useAuth';
import {useTranslations} from 'next-intl';
import { Container, Row, Col } from 'reactstrap';
import { UilArrowCircleRight, UilAngleDown, UilHourglass, UilFeedback, UilGrin, UilMoon   } from '@iconscout/react-unicons'
import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import PasswordStrengthBar from 'react-password-strength-bar';
import { api } from '../../../lib/axios';
import { ToastContainer, toast } from 'react-toastify';


export default function RequestPassword(props) {

  const t = useTranslations('Register');

  const [newPassword, setNewPassword] = useState('')
  const { authenticated } = useAuth();
  
 
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleRegister = async (values: any) => {
    
    // Faça a solicitação de login ao backend usando axios
    // Envie formData.username e formData.password
    api.post('account/reset-password/init', values).then(function (response) {
      toast.success('Verifique seu e-mail para detalhes sobre a criação de uma nova senha.', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    .catch(function (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    
  };
  
  type FieldType = {
    email?: string;
  };
  
  
  return (
    <>
      <Head>
        <title>GD - Request</title>
      </Head>
      
      <Layout style={{background: 'transparent'}}>
        
        <Row className='mainSection' style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50}} >
          <Col>
            <Container fluid>
              <h1>Nova senha</h1>
              <p>Informe endereço de e-mail utilizado no cadastro</p>
              <Form
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleRegister}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                

                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input type='email' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Criar Nova senha
                  </Button>
                </Form.Item>
              </Form>
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
      messages: (await import(`../../../messages/${context.locale}.json`)).default
    }
  };
}