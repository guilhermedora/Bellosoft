import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';

function RedictToDefaultPage({ path }) {
    const { pathname } = useLocation()
    return pathname !== '/' ? <Outlet /> : <Navigate to={path} />
}

function MainRoutes() {
    return (
        <Routes >
            <Route element={<RedictToDefaultPage path='/login' />}>
                <Route path='/' />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
    )
}

export default MainRoutes;