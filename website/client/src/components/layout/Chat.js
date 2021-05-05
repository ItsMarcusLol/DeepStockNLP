import Grid from '@material-ui/core/Grid';
import ChatList from './ChatList';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/icons/Send';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
 ResponsiveContainer,
} from 'recharts';

const styles = (theme) => ({
  fC:{
    width: 1000,

  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  textF: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
       minWidth: 400,
    },
  },
  button: {
    '& > *': {
    width:225,
    height: 40,
    margin: theme.spacing(2),
    },
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: false,
      text : '',
      username:'',
      acctPts: {},
      chats: [],
      loggedOut: true,
      v: 'filled'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
  }
  

  async newMessage() {
    
    var d = new Date();
    console.log("Start of newMessage: " + d.getTime());

    // await fetch('http://104.196.230.228:80/forum/chat', {method: "GET"})
    await fetch ('http://35.247.73.118/DeepStock/forum/chat', {method: "GET"})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Error: " + response.status);
            } else {
              console.log(response.status);
              
              return response.json();
            }
          })
          .then( (obj) => {
           
            console.log("Before chats state: " + d.getTime());
            this.setState({chats: obj});
            
            console.log("Before text state: " + d.getTime());
            this.setState({text: ''});

            console.log("End of obj: " + d.getTime());
          });



    console.log("End of newMessage: " + d.getTime());

    //this.render();
  }
    
    componentDidMount() {
      const u1 = localStorage.getItem('user');
      this.newMessage();
    
    
    if (u1.length > 0 ){
      this.setState({ loggedOut:false});
      this.setState({ v: 'outlined'});
    }
    
    this.setState({ username:u1 });
    };

  async buttonChange(event){
    
    var d = new Date();
    console.log("Start of buttonChange: " + d.getTime());
    
    // await fetch('http://104.196.230.228:80/forum/chat', {method: "POST", body: JSON.stringify({username: this.state.username, text: this.state.text})})
    await fetch ('http://35.247.73.118/DeepStock/forum/chat', {method: "POST", body: JSON.stringify({username: this.state.username, text: this.state.text})})
      .then( (response) => {
        if ( response.status !== 200) {
          console.log("Error: " + response.status);
        } else {
          console.log(response.status);
          return response.text();
        }
      })
      .then( (text) => {
        console.log(text);
    });
    
    
    console.log("Before calling newMessage: " + d.getTime());

    this.newMessage();
    
    console.log("After newMessage: " + d.getTime());
    // this.render();

    //this.setState({text: ''});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
   
    if (name === 'post'){
      console.log("button click")
      this.setState({
        text: '',
        post: false
      });
    }
    else{
    this.setState({
      [name]: value
    });
  }
  }

  render() {
    const {classes} = this.props;
    
    return (  
         <Paper>
    
      <Grid container spacing={2} 
        direction="row"
        justify="space-evenly"
         alignItems="center"
         
         >

        <Grid item xs = {12}>
          <div>
          <ChatList cList = {this.state.chats}/>
          </div>
        </Grid>
        
          <Grid item xs = {12} sm = {12} md = {9}>
          <ResponsiveContainer width='100%'  aspect={4.0/2.0}>
            <div> 
            <form className={classes.textF} noValidate autoComplete="off">
              <TextField id="outlined-basic" 
              name = 'text'
              value = {this.state.text}
              label="Post your prediction"  
              multiline rows = {3} 
              variant="outlined"
              size = 'medium'
              onChange = {this.handleInputChange}
              disabled = {this.state.loggedOut}
              variant = {this.state.v}
              />
            </form>
            </div>
            </ResponsiveContainer>
          </Grid>
          
          <Grid item xs = {12} sm = {12} md = {3}>
           <div>
              <Button
              name = "post"
              type = "submit"
               onClick= {
                 this.buttonChange
                }
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                >
                Post
              </Button>
              </div> 
          </Grid> 
          
        </Grid>
        </Paper>
    );
   
  }
}

export default withStyles(styles, )(Chat);