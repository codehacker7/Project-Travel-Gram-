import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar/NavBar.js';

const useStyles = makeStyles({
	layout: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
	},
  content: {
    flexGrow: 1
  }
});

const Layout = props => {

  const classes = useStyles();
  const url = useLocation();
  const isAuth = url.pathname.includes('login') || url.pathname.includes('register');
  const isDark = url.pathname.includes('profile') || url.pathname.includes('trip');
  
  return (
    <div className={classes.layout}>
      {!isAuth && <NavBar darkMode={isDark}/>}
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  )
}

export default Layout;