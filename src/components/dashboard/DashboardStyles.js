import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@mui/material/styles';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#005596'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const theme = createTheme({
  palette: {
    neutral: {
      main: '#005596',
      contrastText: '#fff',
    },
  },
});

export default useStyles;