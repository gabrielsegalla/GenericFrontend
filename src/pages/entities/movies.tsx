import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import { Layout, Table } from 'antd';
import ProtectedRoute from '../../components/ProtectedRoute';
import Reducer from '../../hook/useReducer';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    id: string;
    title: string;
    description: string;
    directedBy: string;
}

export default function Settings(props) {

    const [ data, setData] = useState([])


    const reducer = Reducer('movies')


    useEffect(()=>{
        reducer.get().then((data)=>{
            setData(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])


    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Directed By	',
            dataIndex: 'directedBy',
            key: 'directedBy',
        },
    ];

    return (
    <ProtectedRoute requiredPermissions={['ROLE_USER']}>
        <Head>
            <title>GD - MOVIES</title>
        </Head>
        <Layout style={{background: 'transparent'}}>
            <Row className='mainSection' style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50}} >
                <Col>
                    <Container fluid style={{maxWidth: '100%', overflow: 'auto', backgroundColor: 'white'}}>
                        <h1>Movies</h1>
                        <Table columns={columns} dataSource={data} />
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