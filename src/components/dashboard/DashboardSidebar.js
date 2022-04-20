import React from 'react';
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
import {gerente, cashier} from './UserRoutes';
import { useNavigate } from "react-router-dom";

const DashboardSidebar = (props) => {
  const [userInfo, setuserInfo] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(()=>{
    setuserInfo(localStorage.getItem('username'));
  },[]);

  const classes = useStyles();

  const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/', { replace: true });
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
          {props.role === 1
            ?<List>
              {gerente.map((value, index) => (
                <ListItem button component="a" href={value.route} key = {index}>
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <ListItemText primary={value.nameRoute} />
                </ListItem>
              ))}
            </List>
            :null
          }
          <Divider />
          <List>
            {cashier.map((value, index) => (
              <ListItem button component="a" href={value.route} key = {index}>
                <ListItemIcon>{value.icon}</ListItemIcon>
                <ListItemText primary={value.nameRoute} />
              </ListItem>
            ))}
          </List>

          {props.role === 2 
          ?<List>
          {cashier.map((value, index) => (
            <ListItem button component="a" href={value.route} key = {index}>
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText primary={value.nameRoute} />
            </ListItem>
          ))}
        </List>
          :null
          
          }
          
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