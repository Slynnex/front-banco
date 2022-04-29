import React,{useState} from 'react';
import {Card, CardContent, TextField, Button} from '@material-ui/core';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Manager from './Manager';
import Loader from '../assets/Loader';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import jwt_decode from "jwt-decode";

const Login = () => {
  const [loader, setLoader] = useState('none')
  const [errorS, setErrorS] = useState({
    display:"none",
    message:'invalid user or password'
  })
  const [loginInfo, setloginInfo] = useState({
    userid: '',
    password: ''
  });
  const [user, setUser] = React.useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = React.useState(false);

  useState(()=>{
    if(!localStorage.getItem('token')){
      setisLoggedIn(false);
    }else{
      setisLoggedIn(true);
    }
  },[])

  const saveLoginInfo = (e) =>{
    if(e.target.name === 'userid'){
        setloginInfo({
            ...loginInfo,
            userid: e.target.value,
        })
    }
    if(e.target.name === 'password'){
        setloginInfo({
            ...loginInfo,
            password: e.target.value,
        })
    }
  }

  const onSubmit = () =>{
    setLoader('flex')
    axios.post('http://localhost:9000/api/v1/login',loginInfo)
    .then(({data}) =>{
        if(!data.token){
          console.log(data)
          setErrorS({...errorS,display:'block'});
        }else{
          setUser(data);
          localStorage.setItem('username', loginInfo.userid);
          localStorage.setItem("token", data.token);
          const decoded = jwt_decode(data.token);

          if(decoded.session.rol === 'manager'){
            navigate('/manager/', { replace: true });
          }else if(decoded.session.rol === 'executive'){
            navigate('/executive/', { replace: true });
          }else{
            navigate('/cashier/', { replace: true });
          }
        }
        setLoader('none')
    })
    .catch(({response}) =>{
        setErrorS({message:response,display:'block'})
        setLoader('none')
    });
}

  return (
  <>
    <Loader display={loader}/>
    {isLoggedIn        
      ? <Manager/>
      :     
      <div className='login'>
        <div sx={{ maxWidth: 900, maxHeigth: 900, minWidth: 900, minHeigth: 900 }} className='login-body'>
          
          <div className='card-login'>
            <div className='logo'>
              <img src='https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/ffffff/external-bank-fintech-kmg-design-detailed-outline-kmg-design.png' text='Bantexico' alt='logo'></img>
              <h1>Bancomex</h1>
            </div>
            <form className='data'>
              <div className='card-alert'>
              <Stack style={{display:errorS.display,marginBottom:'10px'}} sx={{ width: '100%' }} spacing={2}>
                <Alert severity="warning">{errorS.message}</Alert>
              </Stack>
              </div>
              <div className='fields'>
                <div className='field'>
                  <p>User ID</p>
                  <TextField className='input-login' id="outlined-basic" label="Write here" variant="outlined" name="userid" autoComplete='off' value={loginInfo.userid} onChange={saveLoginInfo}/>
                </div>
                <div className='field'>
                  <p>Password</p>
                  <TextField className='input-login' id="outlined-basic" label="Write here" variant="outlined" type="password" name="password" value={loginInfo.password} onChange={saveLoginInfo}/>
                </div>
              </div>
              <div className='footer-login'>
                <Button style={{textAling:'right'}} variant="contained" color="primary" size="large" onClick={onSubmit}>Sign in</Button>
              </div>
            </form>
          </div>
        </div>
    </div>     
    }
  </>

  )
}

export default Login;