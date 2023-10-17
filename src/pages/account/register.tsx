import Head from 'next/head'
import useAuth from '../../hook/useAuth';
import {useTranslations} from 'next-intl';
import { Container, Row, Col } from 'reactstrap';
import { UilArrowCircleRight, UilAngleDown, UilHourglass, UilFeedback, UilGrin, UilMoon   } from '@iconscout/react-unicons'
import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import PasswordStrengthBar from 'react-password-strength-bar';
import { api } from '../../lib/axios';
import { ToastContainer, toast } from 'react-toastify';


export default function Register(props) {

  const t = useTranslations('Register');

  const [newPassword, setNewPassword] = useState('')
  const { authenticated } = useAuth();
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleRegister = async (values: any) => {
    
    // Faça a solicitação de login ao backend usando axios
    // Envie formData.username e formData.password
    api.post('register', values).then(function (response) {
      toast.success('Registration saved!,  Please check your email for confirmation.', {
        position: "top-right",
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
    login?: string;
    password?: string;
    email?: string;
  };
  
  
  return (
    <>
      <Head>
        <title>GD - Register</title>
      </Head>
      
      <Layout style={{background: 'transparent'}}>
        
        <Row className='mainSection' style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Col>
            <Container fluid>
              <h1>{t('title')}</h1>
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
                  label="Username"
                  name="login"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input type='email' />
                </Form.Item>

                <Form.Item<FieldType>
                  label="New password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password  onChange={(e)=>{setNewPassword(e.target.value)}}  />
                  <PasswordStrengthBar password={newPassword} />
                </Form.Item>

                <Form.Item<FieldType>
                  label="New password confirmation"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Register
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
      messages: (await import(`../../messages/${context.locale}.json`)).default
    }
  };
}