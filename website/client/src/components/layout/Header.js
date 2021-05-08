import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = (theme) => ({
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
});

const titleStyle = {

    textAlign: 'center',
  
    alignItems: 'center',
    marginTop: '5px',  
    color: '#fff',
    fontSize: '45px',
    align : "right", 
  }
  
  const headerStyle = {
    background: 'linear-gradient(45deg, #000023 30%,   #000053 90%)',
    direction: 'row', 
}


  class Header extends React.Component{

   constructor(props) {
    super(props);
    this.state = {
      open: false,
      openU: false,
      username: "", 
      theme: null,
     
  };
  
    this.anchorRef = React.createRef();
    this.setOpen = this.setOpen.bind(this);
    this.setOpenU = this.setOpenU.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  setOpen(e){
    this.setState({
      open: e,
  });
  }
  

  setOpenU (e){
    this.setState({
      openU: e,
  });
}

  setUsername(e){
    this.setState({
      username: e,
  });
}
  
 
  componentDidMount() {
    const u1 = localStorage.getItem('user');
    if (localStorage.getItem('user') == null){
      localStorage.setItem('user',"");
    }
    if (this.state.username !== u1){
      this.setState({ username:u1 });
    }
  };

  handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.setOpen(false);
    }
  }

  handleLogout=()=> {
    localStorage.setItem('user',"");
    window.location.reload(false);
  }
  handleDrawerOpen = () => {
    this.setOpen(true);
  };

  handleToggle = () => {
    this.setOpenU((prevOpen) => !prevOpen);
  };

  handleDrawerClose = () => {
    this.setOpen(false);
  };

  handleClose = (event) => {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
      return;
    }

    this.setOpenU(false);
    
  };

  
render(){
  const {classes} = this.props;
  
 
return (

  <div className={classes.grow}>
      
    <AppBar
         position="fixed"
         style = {headerStyle}
    
         className={clsx(classes.appBar, {
           [classes.appBarShift]: this.state.open,
         })}
       >
  
      <Toolbar> 
          <div style = {titleStyle} > 
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            </div>
            <div   style = {titleStyle}> 
            <Typography   variant="h6" noWrap  style = {titleStyle} component={Link} to="/">
              DeepStock
            </Typography>


          </div>

          <div className={classes.grow} />
               <div style={titleStyle} >

          <Button
          ref={this.anchorRef}
          aria-controls={this.state.open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
          color="inherit"
          >
            {this.state.username}
         </Button> 
        <Popper open={this.state.openU} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList autoFocusItem={this.state.open} id="menu-list-grow" onKeyDown={this.handleListKeyDown}>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Icon
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                <AccountCircle />
               </Icon>
        </div>


      </Toolbar>
    </AppBar>

 
       <Drawer
      
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider />
        <List>
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
        
      </Drawer>

      <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
        </main>
  <div style = {{marginBottom : "20px"}}>.....</div>
 
  </div>

);
}
}

export default withStyles(styles, )(Header);