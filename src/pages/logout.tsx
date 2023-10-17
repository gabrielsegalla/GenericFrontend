// components/Logout.js
import React from 'react';
import Cookies from 'js-cookie';
import useAuth from '../hook/useAuth';

const Logout = () => {
    const { authenticated } = useAuth();    
    const handleLogout = () => {
        Cookies.remove('token'); // Remove o token dos cookies
        // Redirecione o usuário para a página de login ou outra página apropriada
    };

    if (!authenticated) {
        // Redirecione o usuário para a página de login ou outra página não autorizada
        return <div>Você não tem permissão para acessar esta página.</div>;
    }

    return (
        <div>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Logout;