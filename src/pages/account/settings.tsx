import Head from 'next/head'
import useAuth from '../../hook/useAuth';
import {useTranslations} from 'next-intl';
import { Container, Row, Col } from 'reactstrap';
import { UilArrowCircleRight, UilAngleDown, UilHourglass, UilFeedback, UilGrin, UilMoon   } from '@iconscout/react-unicons'
import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Select, Space, Table, Tag } from 'antd';
import PasswordStrengthBar from 'react-password-strength-bar';
import { apiAuthenticated } from '../../lib/axios';
import { ToastContainer, toast } from 'react-toastify';
import { ColumnsType } from 'antd/es/table';
import { error } from 'console';
import ProtectedRoute from '../../components/ProtectedRoute';


export type UserModel =  {
    id?: any;
    login?: any;
    firstName?: any;
    lastName?: any;
    email?: any;
    imageUrl?: any;
    activated?: any;
    langKey?: any;
    createdBy?: any;
    createdDate?: any;
    lastModifiedBy?: any;
    lastModifiedDate?: any;
    authorities?: any;
}

export default function Settings(props) {


    const [ user, setUser] = useState<UserModel>({})

    const t = useTranslations('Register');



    useEffect(()=>{
        apiAuthenticated.get(`account`,).then((data)=>{
            setUser(data.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    
    const { Option } = Select;

    const onSubmit = () =>{
        apiAuthenticated.post(`account`,{
            
        }).then((data)=>{
            setUser(data.data)
        }).catch((error)=>{
            console.log(error)
        })
    }


    return (
    <ProtectedRoute requiredPermissions={['ROLE_USER']}>
        <Head>
            <title>GD - SETTINGS</title>
        </Head>
        <Layout style={{background: 'transparent'}}>
            <Row className='mainSection' style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50}} >
                <Col>
                    <Container fluid style={{maxWidth: '100%', overflow: 'auto', backgroundColor: 'white'}}>
                        <h1>User settings for [{user.firstName}]</h1>
                        <Form layout="vertical" initialValues={{ firstName: user.firstName, lastName: user.lastName, email: user.email, langKey: user.langKey }}>
                            <Form.Item label="Firstname" required tooltip="This is a required field" name="firstName" >
                                <Input/>
                            </Form.Item>

                            <Form.Item label="Lastname" required tooltip="This is a required field" name="lastName">
                                <Input defaultValue={user.lastName} />
                            </Form.Item>

                            <Form.Item label="Email" required tooltip="This is a required field" name="email">
                                <Input defaultValue={user.email} type='email' />
                            </Form.Item>

                            <Form.Item name="langKey" label="Language" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Language"
                                    defaultValue={user.langKey}
                                    allowClear
                                >
                                <Option value="pt-br">Português</Option>
                                <Option value="en-us">Ingles</Option>
                                </Select>
                            </Form.Item>
                            
                            
                            <Form.Item>
                                <Button type="primary">Submit</Button>
                            </Form.Item>


                        </Form>
                    </Container>
                </Col>
            </Row>
        </Layout>
    </ProtectedRoute>
    )
}


export async function getStaticProps(context) {


    return {
        props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default
        }
    };
}