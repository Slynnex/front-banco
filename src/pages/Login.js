import React from 'react';
import {Card, CardContent, TextField, Button} from '@material-ui/core';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Manager from './Manager';

const Login = () => {
  const [loginInfo, setloginInfo] = React.useState({
    userid: '',
    password: ''
  });
  const [user, setUser] = React.useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = React.useState(false);

  React.useState(()=>{
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
    console.log(loginInfo);
    axios.post('http://localhost:9000/api/v1/login',loginInfo)
    .then(({data}) =>{
        if(!data.token){
          alert('User not found');
        }else{
          setUser(data);
          console.log(data.token);
          localStorage.setItem('username', loginInfo.userid);
          localStorage.setItem("token", data.token);
          alert('Log In sucessfull, welcome');
          navigate('/manager/', { replace: true });
          window.location.reload(true);
        }
    })
    .catch(({response}) =>{
        alert('User not found');
        console.log(response);
    });
}

  return (
  <>
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