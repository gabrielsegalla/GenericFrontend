import { Dropdown, Layout, Menu } from "antd";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";
import Login from "./Login";
import Cookies from 'js-cookie';
import type { MenuProps } from 'antd';
import { useTranslations } from "next-intl";
import { useAuth  } from '../contexts/AuthContext';
import { Col, Row, Container } from "reactstrap";
import { HomeOutlined, TableOutlined, ClusterOutlined, UserOutlined } from '@ant-design/icons';
import { createElement } from "react";
import Link from 'next/link';
import { isAdmin } from "../hook/isAdmin";



const Navbar = ({}) => {
    const { Header } = Layout;
    const { authenticated, authorities } = useAuth();

    const { SubMenu } = Menu;
    const handleLogout = () => {
        Cookies.remove('token'); // Remove o token dos cookies
        window.location.href  = "/";
    };

    
    const menuItems = [
      {
        link: '/',
        isSubMenu: false,
        label: "Inicio",
        key: "home",
        icon: createElement(HomeOutlined)
      },
      {
        isSubMenu: true,
        label: "Entidades",
        key: "entities",
        icon: createElement(TableOutlined),
        children :[
          {link: 'entities/movies', icon: createElement(ClusterOutlined ), key: 'admin1', label: 'Movies'},
        ]
      },
      {
        onlyAdmin: true,
        isSubMenu: true,
        label: "Administração",
        key: "admin",
        icon: createElement(ClusterOutlined ),
        children :[
          {link: 'admin/user-management', icon: createElement(ClusterOutlined ), key: 'admin1', label: 'User management'},
        ]
      },
      {
        isSubMenu: true,
        label: "Conta",
        icon: createElement(UserOutlined),
        key: "account",
        children :[
          {link: 'account/settings', icon: createElement(ClusterOutlined ),key: 'account1', label: 'Settings'},
          {link: '', icon: createElement(ClusterOutlined ),key: 'account2', label: 'Password'}
        ]
      }
    ]

    console.log(authorities)
    

    return (
        <Header 
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 6,
            width: '100%'
          }}>
          <Container>
            <Row>
              <Col md={2}>
                <a  href="/" style={{display:"flex", flexDirection:'row', alignItems: 'center'}}><h3 style={{color: '#fff'}}>GENERIC</h3>
                <p style={{marginLeft: 15, fontSize: 8}}>V.0.1</p></a>
                
              </Col>
              <Col >
              {authenticated ?(
                <Menu theme="dark" mode="horizontal" style={{display: 'flex', justifyContent: 'center'}}>
                  {menuItems.map((menuItem, index)=>{
                    return(
                      <>
                        {!menuItem.isSubMenu ? (
                          <Menu.Item key={menuItem.key} icon={menuItem.icon} hidden={menuItem.onlyAdmin && !isAdmin(authorities)}>
                            <Link href={menuItem.link}> {menuItem.label} </Link>
                          </Menu.Item>
                        ):(
                          <SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.label} style={menuItem.onlyAdmin && !isAdmin(authorities) ? {display: 'none'} : {}}>
                            {menuItem.children ? menuItem.children.map((subMenuItem, index)=>{
                              return(
                                <Menu.Item key={subMenuItem.key} icon={subMenuItem.icon}>
                                  <Link href={subMenuItem.link}> {subMenuItem.label} </Link>
                                </Menu.Item>
                              )
                            }): ''}
                          </SubMenu>
                            )}
                  
                      </>
                    )
                  })}
                </Menu>
              ):(
                <></>
              )}
                
              </Col>
              <Col md={2} style={{display:'flex'}}>
                <Col>
                  <LanguageSelector></LanguageSelector>
                </Col>
                <Col>
                  <Login />
                </Col>
              </Col>
            </Row>
          </Container>
        </Header>
      );
}

export default Navbar

