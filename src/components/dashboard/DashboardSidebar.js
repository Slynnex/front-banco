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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import useStyles from './DashboardStyles';

import {gerente, cashier} from './UserRoutes'

const DashboardSidebar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Bancomex
          </Typography>
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