// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// class Login extends Component {
//     state = {
//         username: '',
//         email: '',
//         password: '',
//         redirect: false
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         this.props.login(this.state.username, this.state.password);
//         if (true) {
//             this.setState({ username: '', password: '', redirect: true });
//         }
//     } 

//     onChange = (e) => this.setState({ [e.target.name]: e.target.value });

//     render() {
//         if (this.state.redirect) {
//             return <Redirect to={"/"} />
//         }
//         return (
//             <div>
//                 <div style={loginStyle}>
//                     <form style={{ display: 'flex' }}>
//                         <input 
//                             type="text"
//                             name="username"
//                             style={{ flex: '10', padding: '30px', fontSize: 40 }}
//                             placeholder="username"   
//                             value={this.state.username}
//                             onChange={this.onChange}
//                         />
//                     </form>
//                     <form style={{ display: 'flex' }}>
//                         <input 
//                             type="text"
//                             name="password"
//                             style={{ flex: '10', padding: '30px', fontSize: 40 }}
//                             placeholder="password"  
//                             value={this.state.password}    
//                             onChange={this.onChange}
//                         />
//                     </form>
//                 </div>
//                 <div style={loginButtonStyle}>
//                     <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
//                         <input 
//                             type="submit"
//                             value="login"
//                             className="loginBtn"
//                             style={{ flex: '10', padding: '30px', background: '#acf', fontSize: 40 }} 
//                         />
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// const loginStyle = {
//     textAlign: 'center',
//     padding: '60px',
//     color: '#000'
// }

// const loginButtonStyle = {
//     textAlign: 'center',
//     margin: '60px',
//     background: '#00f'
// }

// export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F05"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Username"
            name="user"
            autoComplete="user"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              {/* <Link href="#" variant="body2"> */}
              <Link to="/signup" style={{color: 'blue'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}