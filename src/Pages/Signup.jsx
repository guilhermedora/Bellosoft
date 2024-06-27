import * as React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import TitleSignup from '../Components/TitleSignup';
import SignupForm from '../Components/SignupForm';
import Grow from '@mui/material/Grow';

function Signup() {
    return (
        <div className='main-container'>
            <Grow
                in={true}
                {...(true ? { timeout: 500 } : {})}
            >
                <div className="container-login">
                    <Header />
                    <TitleSignup />
                    <SignupForm />
                    <Footer />
                </div>
            </Grow>
        </div>
    );
}

export default Signup;