import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';

function LoginForm() {
    const [wrongCredentialsAlert, setWrongCredentialsAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [failAlert, setFailAlert] = useState(false)
    const [eyeControl, setEyeControl] = useState(false)
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handlerChangeInput = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = login
        const key = login.email
        const storageItem = localStorage.getItem(key);
        if (!storageItem || !email || !password) {
            setFailAlert(true)
            setTimeout(() => {
                setFailAlert(false)
            }, 3000)
            return
        }
        const recoveryData = await JSON.parse(storageItem);
        if (recoveryData.email === email && recoveryData.password === password) {
            setSuccessAlert(true)
            setTimeout(() => {
                setSuccessAlert(false)
            }, 3000)
        } else {
            setWrongCredentialsAlert(true)
            setTimeout(() => {
                setWrongCredentialsAlert(false)
            }, 3000)
        }
    }


    return (
        <form className='container-formlogin'>
            <Snackbar
                open={successAlert || failAlert || wrongCredentialsAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert variant="standard" severity={successAlert ? "success" : "error"}>
                    {successAlert
                        ? 'Logando no sistema...'
                        : failAlert
                            ? 'Verifique os campos e tente novamente.'
                            : 'Email ou Senha incorretos.'
                    }
                </Alert>
            </Snackbar>
            <div className="formlogin-mail">
                <EmailIcon htmlColor='#CCCCCC' />
                <div className='formlogin-mail-inputgroup' >
                    <label
                        className='input-label'
                        htmlFor="email"
                    >
                        Email Address
                    </label>
                    <input
                        className='input-field'
                        type="text"
                        name="email"
                        placeholder='Your email address'
                        value={login.email}
                        onChange={(e) => handlerChangeInput(e)}
                        required
                    />
                </div>
            </div>
            <div className="formlogin-password">
                <LockIcon htmlColor='#CCCCCC' />
                <div className='formlogin-password-inputgroup'>
                    <label
                        className='input-label'
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className='input-field'
                        type={eyeControl ? "text" : "password"}
                        name="password"
                        placeholder='Enter your password'
                        value={login.password}
                        onChange={(e) => handlerChangeInput(e)}
                        required
                    />
                </div>
                <IconButton className='eye-control'
                    onClick={() => setEyeControl(!eyeControl)}
                >
                    {eyeControl
                        ? <VisibilityIcon htmlColor='#CCCCCC' />
                        : <VisibilityOffIcon htmlColor='#CCCCCC' />
                    }
                </IconButton>
            </div>
            <Grow
                in={true}
                {...(true ? { timeout: 1000 } : {})}
            >
                <Button className='submit-button'
                    type='submit'
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </Button>
            </Grow>
            <Link className='link-forgot color-brown'
                underline='none'
                href='#'
            >
                Forgot Password
            </Link>
        </form>
    );
}

export default LoginForm;