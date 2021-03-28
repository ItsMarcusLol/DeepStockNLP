
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React from "react";
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
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
    });

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

class Login extends React.Component{
 

    constructor(props) {
      super(props);
      this.state = {
        username: "", 
        password: "",
        accounts: this.props.accounts,
        redirect : false,
    };

      console.log(this.state.accounts);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }
   
  

      validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
      }

      handleSubmit(event) {
       
        event.preventDefault();
        
        const user = this.state.username;
        const pass = this.state.password;
    
        const ac = this.state.accounts.find(
          function(acct){ return (acct.username === user && acct.password === pass )} );

        if (ac==null){
          console.log("Wrong password")
        }
          else if (ac.username === this.state.username && ac.password === this.state.password){
            this.setState({username: "", password: "", redirect: true});
          }
                
          else{
               console.log("Wrong password")
          }
      }


      onChange = (e) =>   this.setState({ 
        [e.target.name]: e.target.value});

      
        
        
    render(){
      const {classes} = this.props;

      if (this.state.redirect) {
                    return <Redirect to={"/"} />
                }
    return (
      // <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value = {this.state.username }
              onChange = {(e) => { this.onChange(e)}}
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
              value = {this.state.password}
              onChange = {(e) => { this.onChange(e)}} 
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
              disabled={!this.validateForm()}
              // onSubmit = {(event) => handleSubmit(event)}
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
        <Box 
        mt={15}  
        // position="absolute"
        // top={}
        
        
        // position='absolute'
        left='0'
        bottom='0'
        right='0'
        // bgcolor="background.paper"
        >
          <Copyright />
        </Box>
      </Container>
      /* </div> */
    );
            }

}

export default withStyles(styles, )(Login);