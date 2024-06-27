import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [routeTo, setRouteTo] = useState("")

    useEffect(() => {
        if (pathname === '/login') setRouteTo("/signup")
        else setRouteTo("/login")
    }, [pathname])


    async function NavigateAction(routeTo) {
        navigate(routeTo)
    }

    return (
        <div className='container-header'>
            <IconButton className='nav-button'
                onClick={() => NavigateAction(routeTo)}
            >
                <ArrowBackIcon htmlColor='white' />
            </IconButton>
        </div>
    );
}

export default Header;