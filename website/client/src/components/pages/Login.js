import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React from "react";
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
      container: {
        backgroundImage:  'linear-gradient(180deg, rgb(4, 30, 117), rgb(0, 255, 234))',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }

    });


class Login extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        userF: "",
        passF: "",
        username: "", 
        password: "",
        redirect : false,
        disable : true,
        message: null
    };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

      validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
        
      }

      handleSubmit(event) { 
       const username = this.state.username;
       const password =  this.state.password;
      this.setState({username: "", password: "", redirect: false});
        var m = "";
       
        event.preventDefault();
        
          // fetch('http://104.196.230.228:6023/login', {method: "POST", body: JSON.stringify({username: username, password: password})})
          fetch('http://35.247.73.118:6023/login', {method: "POST", body: JSON.stringify({username: username, password: password})})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Status: " + response.status);
              m = <h1 
              style={{fontSize: 24, color: "#FF0000" }}> 
              Wrong username or password 
              </h1>;
              this.setState({username: "", password: "", redirect: false, message: m});

              return response.text();
            } else {
              console.log("Status: " + response.status);
              const user = username;
              localStorage.setItem('user', user);
              m = <h1 
              style={{fontSize: 24, color: "#00CC00" }}> 
              Login succesful! 
              </h1>;
              this.setState({username: "", password: "", redirect: true, message: m});
              return response.text();
            }
          })
          .then( (text) => {
            console.log("Message: " + text);
          });
      }


      onChange = (e) =>   this.setState({ 
        [e.target.name]: e.target.value});
  
    render(){
     const {classes} = this.props;

      if (this.state.redirect) {
                    // window.location.href = "http://104.196.230.228:6023/"
                    window.location.href = "http://35.247.73.118:6023/"
                }
    return (
      <div className = {classes.div}>
       <Container component="main" maxWidth="xs" minHeight= '100%' >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

            <div>
            {this.state.message}
            </div>

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
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this.validateForm()}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" style={{color: 'blue'}}>
                  {"Don't have an account? Sign Up"}
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

export default withStyles(styles, )(Login);