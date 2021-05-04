import { Link } from 'react-router-dom';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
      div:{
        height: '900px',
        backgroundSize: 'cover' 
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    });

class SignUp extends React.Component{
 
    constructor(props) {
      super(props);
      this.state = {
          username: '',
          email: '',
          password: '',
          rePassword: '',
          message: ""
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }
   
        onSubmit = (e) => { 
          var m ="";
          const username = this.state.username;
          const password = this.state.password;
          console.log(username, password)
          this.setState({username: "", password: "",  rePassword: ""});
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);

        console.log(JSON.stringify({username: username, password: password}));
        fetch('http://104.196.230.228:80/account', {method: "POST", body: JSON.stringify({username: username, password: password})})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Status: " + response.status);
              m = <h1 
              style={{fontSize: 24, color: "#FF0000" }}> 
              Username or password is invalid
              </h1>;
              this.setState({username: "", password: "", redirect: false, message: m});
              return response.text();
            } else {
              console.log("Status: " + response.status);
              const user = username;
              localStorage.setItem('user', user);
              m = <h1 
              style={{fontSize: 24, color: "#FF0000" }}> 
              Sign up Succesful!
              </h1>;
              this.setState({username: "", password: "", redirect: true, message: m});
              return response.text();
            }
          })
          .then( (text) => {
            console.log("Message: " + text);
          });
       } 
  

      validateForm() {
        return this.state.password === this.state.rePassword && this.state.username.length > 0 && this.state.password.length > 0 && this.state.rePassword.length > 0 ;
      
      }

      onChange = (e) =>   this.setState({ 
        [e.target.name]: e.target.value});
        
    render(){
      console.log(this.state.rePassword)
      const {classes} = this.props;

      if (this.state.redirect) {
        window.location.href = "http://104.196.230.228:80/"
    }
    return (
      <div className = {classes.div}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <div>{this.state.message}</div>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
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
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rePassword"
                label="Re-Enter Password"
                type="password"
                id="rePassword"
                autoComplete="re-current-password"
                value= {this.state.rePassword}
                onChange = {(e) => {this.onChange(e)}}
              />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this.validateForm()}
            
             
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                {/* <Link href="#" variant="body2"> */}
                <Link to="/login" style={{color: 'blue'}}>
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      </div>
    );
  }
}

export default withStyles(styles, )(SignUp);