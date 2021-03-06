



import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import ChatList from './ChatList';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/icons/Send';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';



const styles = (theme) => ({
  fC:{
    width: 1000,

  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 90,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  textF: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: '30ch',
    },
  },
  button: {
    '& > *': {
      
    width:125,
    height: 40,
    marginLeft:20,
    marginRight:25,
    margin: theme.spacing(4),
    },
  },
});


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
      stock: '',
      post: false,
      // searchNodes: ""

    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    console.log(value)
    console.log(name)

    this.setState({
      [name]: value
    });
  }

  render() {
    const {classes} = this.props;
    
    return (  
       <div>
    
      <Grid container spacing={2} container
  direction="row"
  justify="space-evenly"
  alignItems="center">
        <Grid item xs = {12}
         container
         direction="row"
         justify="center"
         alignItems="center">
          <ChatList/>
        </Grid>
        

          <Grid item xs = {4}
           container
           direction="row"
           justify="center"
           alignItems="center">
            <form className={classes.textF} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Outlined"  multiline rows = {5} variant="outlined"/>
            </form>
          </Grid>

        
          <Grid item xs = {2}
         container
         direction="row"
         justify="center"
         alignItems="center">
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Stock</InputLabel>
              <Select
                name="stock"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.stock}
                onChange={this.handleInputChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'GOOGL'}>Google </MenuItem>
                <MenuItem value={'AMZN'}>Amazon</MenuItem>
                <MenuItem value={'F'}>Ford</MenuItem>
                <MenuItem value={'WMT'}>Walmart</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs = {3} 
          container
          direction="row"
          justify="center"
          alignItems="center">
            {/* <form className={classes.button} noValidate autoComplete="off"> */}
              <Button
              name = "post"
              classes = {classes.button}
               onClick= {
                 this.handleInputChange

                }
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                >
                Post
              </Button>
          {/* </form> */}
          </Grid> 
        </Grid>
 
        </div>
    );
   
    //   <TextField id="outlined-basic" label="Outlined"  multiline rows = {5} variant="outlined"/>
    //   <Button
    //       variant="contained"
    //       color="primary"
    //     //   className={classes.button}
    //       endIcon={<Icon>send</Icon>}
          
          
    //     >
    //       Send
    //     </Button>
    // </form>
    // </div>
  // );
// }
  }
}

export default withStyles(styles, )(Chat);