import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';



import Button from '@material-ui/core/Button';


import { Link } from 'react-router-dom';
import 'C:/Users/dcard/Cap-Repo/DeepStockNLP/website/client/src/App.css';


import AccountCircle from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  
  appBar: {
    background:'linear-gradient(45deg, #000023 30%,   #000053 90%)',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const titleStyle = {

    textAlign: 'center',
  
    alignItems: 'center',
    marginTop: '5px',  
    color: '#fff',
    fontSize: '45px',
    align : "right", 
  }
  
  const headerStyle = {
    // background: '#8ED1FC',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: 'linear-gradient(45deg, #64654F 30%,   #C5BC99 90%)',
    background: 'linear-gradient(45deg, #000023 30%,   #000053 90%)',
    // height: "100px",
    direction: 'row', 

}



export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [openU, setOpenU] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleToggle = () => {
    setOpenU((prevOpen) => !prevOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenU(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }


      
return (

  <div className={classes.grow}>
         {/* <div className={classes.root}>  */}
       {/* <CssBaseline />*/}
    
    <AppBar
         position="fixed"
         style = {headerStyle}
    
         className={clsx(classes.appBar, {
           [classes.appBarShift]: open,
         })}
       >
      {/* <AppBar position="static" style = {headerStyle}>  */}
  
      <Toolbar> 
          <div style = {titleStyle} > 
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            </div>
            <div   style = {titleStyle}> 
            <Typography   variant="h6" noWrap  style = {titleStyle}>
              DeepStockNLP
            </Typography>


          </div>

          <div className={classes.grow} />
               {/* <div className={classes.sectionDesktop}> */}
               <div style={titleStyle} >
           
                 <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                <AccountCircle />
               </IconButton>
              
              
                 {/* <Typography style ={usernameStyle} variant="caption" noWrap> */}
               {/* <Typography  variant="caption"   noWrap>
                     Username
                </Typography> */}

         

          <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
          >
            Username
         </Button> 
        <Popper open={openU} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>


      </Toolbar>
    </AppBar>

 
       <Drawer
      
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* {['Home', 'About', 'Login', 'SignUp'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
           <ListItem button key={"Home"} component={Link} to="/">
            <ListItemText primary= "Home"/>
            </ListItem>
           
             <ListItem button key="About" component={Link} to="/about">
            <ListItemText primary= "About"/>
          </ListItem>

          <ListItem button key="Login" component={Link} to="/login">
            <ListItemText primary= "Login"/>
          </ListItem>

          <ListItem button key="Sign Up" component={Link} to="/signup">
            <ListItemText primary= "Sign Up"/>
          </ListItem>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        </main>
        {/* <Toolbar>
     ...toolbar content... */}
  {/* <Toolbar/> */}
  <div style = {{marginBottom : "20px"}}>.....</div>
 
  </div>

);
}