import React,{useContext, useState} from 'react';
import {Card, CardContent, TextField, Button} from '@material-ui/core';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import Manager from './Manager';
import Loader from '../assets/Loader';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { Context } from '../context/User/UserContext';


const Login = () => {
  // States to use
  const [loader, setLoader] = useState('none')
  const[block, setBlock] = useState(true);
  const [errorS, setErrorS] = useState({
    display:"none",
    message:'invalid user or password'
  })
  const [loginInfo, setloginInfo] = useState({
    userid: '',
    password: ''
  });
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = React.useState(false);

  const [decoded, setDecoded] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  
  //Validation of route
  useState(()=>{
    if(!localStorage.getItem('token')){
      setisLoggedIn(false);
    }else{
      setisLoggedIn(true);
    }
  },[])


  const {login,state,tryLocalSignin} = useContext(Context);
 

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

  //Request to database for the validation of loginInfo and returning the user if found it
  const onSubmit = () =>{
    setLoader('flex')
    login({loginInfo,setLoader,setErrorS});
}


React.useEffect(()=>{
  if(state.token){
    if(state.rol === 'manager'){
      navigate('/manager/', { replace: true });
    }else if(state.rol === 'executive'){
      navigate('/executive/', { replace: true });
    }else{
      navigate('/cashier/', { replace: true });
    }
  }
},[state]);



React.useEffect(() => {
  console.log("Entro")
  tryLocalSignin();
},[])


const changeBlock=()=>{
  if(loginInfo.userid.length !== 0 && loginInfo.password.length !== 0){
    setBlock(false);
  }else{
    setBlock(true);
  }
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
                  <TextField className='input-login' id="outlined-basic" label="Write here" variant="outlined" name="userid" autoComplete='off' value={loginInfo.userid} onChange={(e)=>{saveLoginInfo(e); changeBlock()}} onBlur={changeBlock}/>
                </div>
                <div className='field'>
                  <p>Password</p>
                  <TextField className='input-login' id="outlined-basic" label="Write here" variant="outlined" type="password" name="password" value={loginInfo.password} onChange={(e)=>{saveLoginInfo(e); changeBlock()}} onBlur={changeBlock}/>
                </div>
              </div>
              <div className='footer-login'>
                <Button disabled={block} style={{textAling:'right'}} variant="contained" color="primary" size="large" onClick={onSubmit}>Sign in</Button>
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