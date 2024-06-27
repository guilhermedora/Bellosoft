import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grow from '@mui/material/Grow';

function LoginForm() {
    const navigate = useNavigate()
    const [successAlert, setSuccessAlert] = useState(false)
    const [failAlert, setFailAlert] = useState(false)
    const [eyeControl, setEyeControl] = useState(false)
    const [signup, setSignup] = useState({
        email: "",
        phone: "",
        password: ""
    })
    const [scanField, setScanField] = useState({
        email: false,
        phone: false,
        password: false
    })

    const handlerChangeInput = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const handlerBlurInput = (e) => {
        let result
        if (e.target.name === "email") {
            result = validityEmail(e.target.value)
        } else if (e.target.name === "phone") {
            result = validityPhone(e.target.value)
        } else {
            result = validityPassword(e.target.value)
        }
        setScanField({ ...scanField, [e.target.name]: result })
    }

    const handlerClearValues = () => {
        const localData = signup
        Object.keys(localData).forEach(key => {
            localData[key] = ''
        })
        setSignup(localData)
    }

    function validityEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regexEmail.test(email)
    }

    function validityPhone(phone) {
        const regexPhone = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/
        return regexPhone.test(phone)
    }

    function validityPassword(password) {
        const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+-])[A-Za-z\d!@#$%^&*+-]{8,}$/
        return regexPw.test(password)
    }

    const handleSubmit = () => {
        const { email: value } = signup
        const { email, phone, password } = scanField
        const key = value
        const storageItem = localStorage.getItem(key)

        if (!email || !phone || !password || storageItem) {
            setFailAlert(true)
            setTimeout(() => {
                setFailAlert(false)
            }, 3000)
            return
        }
        const transformeData = JSON.stringify(signup)
        localStorage.setItem(key, transformeData)
        setSuccessAlert(!successAlert)
        setTimeout(() => {
            handlerClearValues()
            navigate("/login")
        }, 1000)
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <form className='container-formlogin'>
            {successAlert && <Snackbar
                open={successAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert variant="standard" severity={"success"}>
                    Logando no sistema...
                </Alert>
            </Snackbar>}
            {failAlert && <Snackbar
                open={failAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert variant="standard" severity={"error"}>
                    Verifique os campos email/senha e tente novamente.
                </Alert>
            </Snackbar>}
            <div className="formlogin-mail">
                <EmailIcon htmlColor='#CCCCCC' />
                <div className='formlogin-mail-inputgroup' >
                    <label className='input-label'
                        htmlFor="email"
                    >
                        Email Address
                    </label>
                    <input className='input-field'
                        type="email"
                        name="email"
                        placeholder='Your email address'
                        value={signup.email}
                        onChange={(e) => handlerChangeInput(e)}
                        onBlur={(e) => handlerBlurInput(e)}
                        onKeyDown={(e) => handleEnterPress(e)}
                        required
                    />
                    {!scanField.email && signup.email &&
                        <span style={{ color: 'red' }}>
                            Invalid Email
                        </span>
                    }
                </div>
            </div>
            <div className="formlogin-phone">
                <SmartphoneIcon htmlColor='#CCCCCC' />
                <div className='formlogin-phone-inputgroup'>
                    <label className='input-label'
                        htmlFor="phone"
                    >
                        Mobile Number
                    </label>
                    <input className='input-field'
                        type="text"
                        name="phone"
                        placeholder='Your mobile phone'
                        value={signup.phone}
                        onChange={(e) => handlerChangeInput(e)}
                        onBlur={(e) => handlerBlurInput(e)}
                        onKeyDown={(e) => handleEnterPress(e)}
                        required
                    />
                    {!scanField.phone && signup.phone &&
                        <span style={{ color: 'red' }}>
                            Invalid Phone
                        </span>
                    }
                </div>
            </div>
            <div className="formlogin-password">
                <LockIcon htmlColor='#CCCCCC' />
                <div className='formlogin-password-inputgroup'>
                    <label className='input-label'
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input className='input-field'
                        type={eyeControl ? "text" : "password"}
                        name="password"
                        placeholder='Enter your password'
                        value={signup.password}
                        onChange={(e) => handlerChangeInput(e)}
                        onBlur={(e) => handlerBlurInput(e)}
                        onKeyDown={(e) => handleEnterPress(e)}
                        required
                    />
                    {!scanField.password && signup.password &&
                        <span style={{ color: 'red' }}>
                            Weake Password
                        </span>
                    }
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
                    variant="contained"
                    onClick={() => handleSubmit()}
                >
                    Create Account
                </Button>
            </Grow>
        </form>
    );
}

export default LoginForm;