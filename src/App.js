import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import './App.css'
import Error from './components/Common/Error';
import Auth from './components/Common/Auth/Auth';
const App = () => {

    return (
        <BrowserRouter>
            <div className='.body'>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<Navigate to='/posts' />} />
                    <Route path='/posts' element={<Home></Home>} />
                    <Route path='/posts/search' element={<Home></Home>} />
                    <Route path='/login' element={<Auth></Auth>} />
                    <Route path='*' element={<Error></Error>} />
                </Routes>
            </div >
        </BrowserRouter>
    );
};

export default App;