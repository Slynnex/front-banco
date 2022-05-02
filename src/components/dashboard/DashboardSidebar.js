import React, {useEffect, useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './DashboardStyles';
import '../../styles/dashboard.css';
import { Button, ThemeProvider} from '@material-ui/core';
import { theme } from './DashboardStyles';
import {gerente, cashier, executives} from './UserRoutes';
import { useNavigate } from "react-router-dom";
import { Context } from '../../context/User/UserContext';
import jwt_decode from "jwt-decode";

const DashboardSidebar = (props) => {
  const [userInfo, setuserInfo] = React.useState('');
  const [routes, setRoutes] = React.useState([]);
  const {state,tryLocalSignin} = useContext(Context)
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    let upperUser = decode.session.name.slice(0,decode.session.name.indexOf(' '));
    setuserInfo(upperUser);
    if(props.role === 1){
      setRoutes(gerente);
    }else if(props.role === 2){
      setRoutes(cashier);
    }else {
      setRoutes(executives);
    }
  },[props.role]);

  useEffect(() => {
    console.log(state)
    tryLocalSignin();
  },[props.role])

  const classes = useStyles();

  const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    navigate('/', { replace: true });
    window.location.reload();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className='toolbar'>
          <Typography variant="h6" noWrap>
            Bancomex
          </Typography>
          <div className='rightside'>
            <ThemeProvider theme={theme}>
              <Button color="primary" variant="contained" size='small' onClick={logout}>
                Log out
              </Button>
            </ThemeProvider>
            <div className='userinfo'>
              <Typography variant="subtitle1" noWrap>
                Welcome {userInfo} !
              </Typography>
              <img className="user" src="https://img.icons8.com/fluency-systems-regular/96/000000/user.png" width="30px" height="30px" alt='user'/>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
              {routes.map((value, index) => (
                <ListItem button component="a" href={value.route} key = {index}>
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <ListItemText primary={value.nameRoute} />
                </ListItem>
              ))}
          </List>          
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {
          props.children
        }
      </main>
    </div>
  );
}

export default DashboardSidebar