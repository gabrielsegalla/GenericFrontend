import Head from 'next/head'
import useAuth from '../../hook/useAuth';
import {useTranslations} from 'next-intl';
import { Container, Row, Col } from 'reactstrap';
import { UilArrowCircleRight, UilAngleDown, UilHourglass, UilFeedback, UilGrin, UilMoon   } from '@iconscout/react-unicons'
import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Space, Table, Tag } from 'antd';
import PasswordStrengthBar from 'react-password-strength-bar';
import { apiAuthenticated } from '../../lib/axios';
import { ToastContainer, toast } from 'react-toastify';
import { ColumnsType } from 'antd/es/table';
import { error } from 'console';
import ProtectedRoute from '../../components/ProtectedRoute';


export default function UserManagement(props) {

    const [ page, setPage] = useState(0)
    const [ user, setUsers] = useState([])

    const t = useTranslations('Register');

    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    useEffect(()=>{
        apiAuthenticated.get(`admin/users?page=${page}&size=20&sort=id,asc`,).then((data)=>{
            setUsers(data.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Idioma	',
            dataIndex: 'langKey',
            key: 'langKey',
        },
        
        {
            title: 'Perfis',
            key: 'authorities',
            dataIndex: 'authorities',
            render: (_, { authorities }) => (
                <>
                {authorities.map((tag) => {
                    let color = tag === 'ROLE_ADMIN' ? 'geekblue' : 'green';
                    if (tag === '"ROLE_USER"') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
        },
        {
            title: 'Criado em	',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Modificado por',
            dataIndex: 'lastModifiedBy',
            key: 'lastModifiedBy',
        },
        {
            title: 'Modificado em',
            dataIndex: 'lastModifiedDate',
            key: 'lastModifiedDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            ),
        },
    ];



    return (
    <ProtectedRoute requiredPermissions={['ROLE_ADMIN']}>
        <Head>
            <title>GD - Usuários</title>
        </Head>
        <Layout style={{background: 'transparent'}}>
            <Row className='mainSection' style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50}} >
                <Col>
                    <Container fluid style={{maxWidth: '100%', overflow: 'auto', backgroundColor: 'white'}}>
                        <h1>Usuários</h1>
                        <Table columns={columns} dataSource={user} />
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