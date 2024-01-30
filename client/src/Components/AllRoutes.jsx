import React from 'react'
import {Route,Routes} from 'react-router-dom' ;
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import PrivetAllRoutes from '../utils/PrivetAllRoutes';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Signup/>} />
            <Route path='/login' element={<Login />} />
            <Route element={<PrivetAllRoutes />} >
                <Route path='/dashboard' element={<Dashboard/>} />
            </Route>
        </Routes>
    )
}

export default AllRoutes
