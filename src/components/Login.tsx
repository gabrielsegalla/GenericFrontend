import React, { useEffect, useState } from 'react';
import { api, apiAuthenticated } from '../lib/axios';
import Cookies from 'js-cookie';
import { Button, Input, Modal } from 'antd';
import { Label } from 'reactstrap';
import Logout from '../pages/logout';
import { useAuth  } from '../contexts/AuthContext';
import { useRouter } from 'next/router';


const Login = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { login, logout, authenticated, setAuthorities, setName } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const getUserInfo = (token) => {
    apiAuthenticated.get('account',{
      headers : {
        'Authorization': `Bearer ${token}` 
      }
    }).then(function (response) {
      const { firstName, authorities } = response.data;
      Cookies.set('name', firstName);
      setName(firstName)
      setAuthorities(authorities)
      Cookies.set('authorities', authorities);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  

  const handleLogin = async () => {
    
    // Faça a solicitação de login ao backend usando axios
    // Envie formData.username e formData.password
    api.post('authenticate', {
        "username": formData.user,
        "password": formData.password,
        "rememberMe": false
    }).then(function (response) {
      const { id_token } = response.data;
      getUserInfo(id_token)
      Cookies.set('token', id_token); // Armazena o token em cookies
      setIsModalOpen(false);
      login()
    })
    .catch(function (error) {
        console.log(error);
    });
    
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleLogin()
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    
    Cookies.remove('token'); // Remove o token dos cookies
    Cookies.remove('name');
    Cookies.remove('authorities');
    logout()
    router.push(`/?refresh=${Math.random()}`);
    location.reload();
  };

  return (
    <div>
      {!authenticated  ? (
        <>
          <Button type="primary" onClick={showModal}>
            Login
          </Button>
          <Modal 
            title="Autenticação"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
            <Button key="back" type="link" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Entrar
            </Button>]}>
              <Label for='user' >
                Usuário
              </Label>
              <Input
                className='inputModal'
                id='user'
                type="text"
                name="user"
                placeholder="Usuário"
                onChange={handleInputChange}
              />
              <Label for='password' >
                Senha
              </Label>
              <Input
                className='inputModal'
                id='password'
                type="password"
                name="password"
                placeholder="Senha"
                onChange={handleInputChange}
              />
              <a href='account/reset/request'> Esqueci minha Senha</a>
          </Modal>
        </>
      ):(
        <Button onClick={handleLogout} className='logoutBtn'>Sair</Button>
      )}
      
      
    </div>
  );
};

export default Login;