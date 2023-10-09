import { Col, Dropdown, Layout } from "antd";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";
import Login from "./Login";
import Cookies from 'js-cookie';
import type { MenuProps } from 'antd';
import { useTranslations } from "next-intl";
import useAuth from './hook/useAuth';

const Navbar = ({}) => {
    const { Header } = Layout;
    const { authenticated } = useAuth();

    
    const handleLogout = () => {
        Cookies.remove('token'); // Remove o token dos cookies
        window.location.href  = "/";
    };
    

    return (
        <Header 
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 6,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Col md={10} >
            <a  href="/" style={{display:"flex", flexDirection:'row', alignItems: 'center'}}><h3 style={{color: '#fff'}}>GENERIC</h3>
            <p style={{marginLeft: 15, fontSize: 8}}>V.0.1</p></a>
          </Col>
          <Col md={4} style={{display:'flex'}}>
            <Col>
              <LanguageSelector></LanguageSelector>
            </Col>
            <Col>
              <Login />
            </Col>
          </Col>
        </Header>
      );
}

export default Navbar

