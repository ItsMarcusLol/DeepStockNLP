// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// class SignUp extends Component {
//     state = {
//         username: '',
//         email: '',
//         password: '',
//         rePassword: '',
//         redirect: false
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         this.props.login(this.state.username, this.state.password);
//         if (this.state.password === this.state.rePassword) {
//             this.setState({ username: '', password: '', redirect: true });
//         }
//     } 

//     onChange = (e) => this.setState({ [e.target.name]: e.target.value });

//     render() {
//         if (this.state.redirect) {
//             return <Redirect to={"/"} />
//         }
//         return (
//             <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
//                 <input 
//                     type="text"
//                     name="email"
//                     style={{ flex: '10', padding: '5px' }}
//                     placeholder="email"   
//                     value={this.state.email}
//                     onChange={this.onChange}
//                 />
//                 <input 
//                     type="text"
//                     name="username"
//                     style={{ flex: '10', padding: '5px' }}
//                     placeholder="username"   
//                     value={this.state.username}
//                     onChange={this.onChange}
//                 />
//                 <input 
//                     type="text"
//                     name="password"
//                     style={{ flex: '10', padding: '5px' }}
//                     placeholder="password"  
//                     value={this.state.password}    
//                     onChange={this.onChange}
//                 />
//                 <input 
//                     type="text"
//                     name="rePassword"
//                     style={{ flex: '10', padding: '5px' }}
//                     placeholder="re-enter password"  
//                     value={this.state.rePassword}    
//                     onChange={this.onChange}
//                 />
//                 <input 
//                     type="submit"
//                     value="sign up"
//                     className="signUpBtn"
//                     style={{flex: 1}}
//                 />
//             </form>
//         );
//     }
// }

// export default SignUp;

import { Link } from 'react-router-dom';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
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
    backgroundColor: "#F05",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="user"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="re-password"
                label="Re-Enter Password"
                type="Re-enter password"
                id="re-Password"
                autoComplete="re-current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to="/login" style={{color: 'blue'}}>
                Already have an account? Sign in
             </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}