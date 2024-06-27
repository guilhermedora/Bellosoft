import IconButton from '@mui/material/IconButton';
import AppleIcon from '../Assets/Apple-icon.svg';
import FacebookIcon from '../Assets/Facebook-icon.svg';
import GoogleIcon from '../Assets/Google-icon.svg';
import TwitterIcon from '../Assets/Twitter-icon.svg';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';

function Footer() {
    const [icons] = useState([GoogleIcon, FacebookIcon, AppleIcon, TwitterIcon])
    const [subtitle, setSubtitle] = useState("")
    const [spanLink, setSpanLink] = useState("")
    const [routeTo, setRouteTo] = useState("")
    const [title, setTitle] = useState("")
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname === '/login') {
            setTitle("Or Continue with Social Accounts")
            setSubtitle("Don’t have an account?")
            setSpanLink(" Create Now")
            setRouteTo("/signup")
        } else {
            setTitle("Or Register with Social Accounts")
            setSubtitle("Already have an account?")
            setSpanLink(" Login Now")
            setRouteTo("/login")
        }
    }, [])

    return (
        <footer className='container-footer'>
            <span className='font-tenor-default'>
                {title}
            </span>
            <div className='media-container-login'>
                {icons.map((icon, index) => (
                    <Fade
                        in={true}
                        style={{ transitionDelay: `${index * 500}ms` }}
                        key={icon}
                    >
                        <IconButton className='media-button'>
                            <img src={icons[index]} />
                        </IconButton>
                    </Fade>
                ))}
            </div>
            <span
                className='font-tenor-default'
            >
                {subtitle}
                <Link
                    underline='none'
                    color={'#BC8363'}
                    href={routeTo}
                >
                    {spanLink}
                </Link>
            </span>
        </footer>
    );
}

export default Footer;