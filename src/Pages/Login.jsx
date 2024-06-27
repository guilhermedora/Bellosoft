import * as React from 'react';
import '../App.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import LoginForm from '../Components/LoginForm';
import TitleLogin from '../Components/TitleLogin';
import Grow from '@mui/material/Grow';

function Login() {
    return (
        <div className='main-container'>
            <Grow
                in={true}
                {...(true ? { timeout: 500 } : {})}
            >
                <div className="container-login">
                    <Header />
                    <TitleLogin />
                    <LoginForm />
                    <Footer />
                </div>
            </Grow>
        </div>
    );
}

export default Login;