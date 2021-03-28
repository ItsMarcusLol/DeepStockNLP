
/////////////// Header 1
// // // import { FormatSize } from '@material-ui/icons';
// // // import React from 'react';
// // import { Link } from 'react-router-dom';

// // // function Header() {
// // //     return (
// // //         <header style={headerStyle}>
// // //             <h1>Deep Stock NLP</h1>
// // //             <Link style={linkSyle} to="/">Home</Link> | <Link style={linkSyle} to="/about">About</Link> | <Link style={linkSyle} to="/login">Login</Link> | <Link style={linkSyle} to="/signup">SignUp</Link>

// // //         </header>

// // //     )
// // // }

// // // const headerStyle = {
// // //     // background: '#8ED1FC',
// // //     // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// // //     // background: 'linear-gradient(45deg, #64654F 30%,   #C5BC99 90%)',
// // //     background: 'linear-gradient(45deg, #000023 30%,   #000053 90%)',
// // //     textAlign: 'center',
// // //     padding: '10px',
// // //     color: '#fff',
// // //     fontSize: '19px'
// // // }

// // // const linkSyle = {
// // //     color: '#fff',
// // //     textAlign: 'right',
// // //     textDecoration: 'none',
// // //     fontSize:'18px'
// // // }

// // // export default Header;



/////////////////////// Header 2 

import { FormatSize } from '@material-ui/icons';
import React from 'react';

// import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
// import 'C:/Users/dcard/Cap-Repo/DeepStockNLP/website/client/src/App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


// const useStyles = makeStyles({
  const useStyles = makeStyles((theme) => ({
      root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
        grow: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          display: 'none',
          [theme.breakpoints.up('sm')]: {
            display: 'block',
          },
      
        },
       
        searchIcon: {
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        inputRoot: {
          color: 'inherit',
        },
        inputInput: {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
      
  }));


function Header() {


    const classes = useStyles();
    

    const [open, setOpen] = React.useState(false);
      const anchorRef = React.useRef(null);
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
    
      function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);
      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
      }, [open]);

  const [state, setState] = React.useState({
    // top: false,
    // left: false,
    // bottom: false,
    right: false,
  });


  

  let map = new Map()
  map['Home'] = "/"
  map['About'] = "/about"
  map['Login'] = "/login"
  map['Sign Up'] = "/signup"
  console.log(map['Sign Up'])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
      
    </div>
  );

    return (
     <div className={classes.grow}>
           <AppBar position="static" style = {headerStyle} >
              <Toolbar>
              <IconButton onClick={toggleDrawer('left', true)}
                    color="inherit"
                    aria-label="open drawer"
                    // style = {sideBStyle}  
                    > 
                    <MenuIcon /> 
                  </IconButton>
                  <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} >
                  {list('left')}
                  </Drawer>

                <Typography style = {titleStyle} variant="h6" noWrap>
                  DeepStockNLP
                </Typography>


            <div className={classes.grow} />
              {/* <div className={classes.sectionDesktop}> */}
              <div style={titleStyle}>
                <IconButton
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
              // align = "center"
            >
                <AccountCircle />
              </IconButton>
              {/* <Typography style ={usernameStyle} variant="caption" noWrap> */}
              {/* <Typography  variant="caption"  style = {usernameStyle} noWrap>
                     Username
                </Typography> */}

                {/* <div> */}
         <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          Username
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
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

            {/* </div> */}
            {/* </div> */}
     
           </Toolbar>
           </AppBar>
        </div> 
    )
}

const headerStyle = {
    // background: '#8ED1FC',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: 'linear-gradient(45deg, #64654F 30%,   #C5BC99 90%)',
    background: 'linear-gradient(45deg, #000023 30%,   #000053 90%)',
    // textAlign: 'right',
    padding: '10px',
    // alignItems: 'center',
    // direction: 'row', 

    // justify: "space-evenly",


    
  //  alignItems: 'center',
    // width: '50px'
    // height: '100px'
    // color: '#fff',
    // fontSize: '36px',
 
}

const titleStyle = {

  // textAlign: 'lright',

  // alignItems: 'flex-end',

  // justify: 'space-between',
  // padding: '10px',

  color: '#fff',
  fontSize: '36px',
  

}

const usernameStyle = {

  // textAlign: 'lright',
  align: 'center',
  // alignItems: 'center',
  // direction: 'row', 

  // justify: "space-evenly",

  // justify: 'space-between',
  // padding: '10px',
  color: '#fff',
  fontSize: '15px',
  

}

const sideBStyle = {
    // background: '#8ED1FC',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: 'linear-gradient(45deg, #64654F 30%,   #C5BC99 90%)',
    // background: 'linear-gradient(45deg, #000023 30%,   #000053 90%)',
    textAlign: 'right',
    padding: '10px',
    color: '#fff',
    marginLeft: '400px',
    fontSize: '19px',
    size: 'medium',
    edge: 'end'
}

const linkSyle = {
    color: '#fff',
    textAlign: 'right',
    textDecoration: 'none',
    fontSize:'18px'
}

export default Header;


