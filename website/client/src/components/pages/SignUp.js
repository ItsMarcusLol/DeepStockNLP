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
      div:{
        // width: '88%',
        height: '900px',
        // backgroundImage: `url(${imgMyimageexample})`,
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
          redirect: false
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }
   
        onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        if (this.state.password === this.state.rePassword) {
            this.setState({ username: '', password: '',rePassword: '', redirect: true });
        }
        fetch('http://104.196.230.228:80/account', {method: "POST", body: JSON.stringify({username: this.state.username, password: this.state.password})})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Error: " + response.body + ", Status: " + response.status);
            } else {
              console.log(response.status);
              return response.text();
            }
          })
          .then( (text) => {
            console.log(text);
          });
       } 
  

      validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.rePassword.length > 0;
      }

      onChange = (e) =>   this.setState({ 
        [e.target.name]: e.target.value});
        
    render(){
      const {classes} = this.props;

      if (this.state.redirect) {
                    return <Redirect to={"/"} />
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
                id="re-Password"
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
                  {"Already have an account? Sign In"}
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