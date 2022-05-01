import React from 'react';
import '../styles/404.css'
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

  return (
    <div className='notfound'>
        <div className='logo'>
            <img src='https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/ffffff/external-bank-fintech-kmg-design-detailed-outline-kmg-design.png' text='Bantexico' alt='logo'></img>
            <h1>Bancomex</h1>
        </div>
        <div className='goback'>
            <h1 className='oops'>Oops! The page you were looking for don't exist.</h1>
            <Button variant="contained" color='primary' onClick={()=>navigate('/', { replace: true })}>Go back</Button>
        </div>
    </div>
  )
}

export default NotFound