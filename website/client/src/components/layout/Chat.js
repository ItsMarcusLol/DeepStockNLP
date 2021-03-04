



import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import ChatList from './ChatList';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/icons/Send';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';



const styles = (theme) => ({
  // fab: {
  //   position: 'fixed',
  //   bottom: theme.spacing(2),
  //   right: theme.spacing(2),
  // },
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
      width: '26ch',
      // right: theme.spacing(2)
    },
  },
  button: {
    '& > *': {
      
    width:125,
    height: 40,
    marginLeft:20,
    marginRight:25,
    // marginDown: 5,
    // margin: 30,
 
      margin: theme.spacing(4),
      
      // left: theme.spacing(2)
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
      searchNodes: ""

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
    console.log(this.props)
    return (
      
       
       <form>
 <Grid container spacing={2}>
           {/* <Grid item xs = {12}></Grid> */}
      <Grid item xs = {12}>
        <ChatList/>
        </Grid>
        <Grid item xs = {2}>
        <FormControl variant="outlined" className={classes.formControl}>
        {/* <FormControl variant="outlined" > */}
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


        <Grid item xs = {4}>
        {/* <form className={classes.textF} noValidate autoComplete="off"> */}
        <TextField id="outlined-basic" label="Outlined"  multiline rows = {4} variant="outlined" />

        {/* </form> */}
        </Grid>

       
        <Grid item xs = {3}>
          <form className={classes.button} noValidate autoComplete="off">
        <Button
        className={classes.button}
        
          variant="contained"
          color="primary"
        //   className={classes.button}
          endIcon={<Icon>send</Icon>}
           >
          Post
        </Button>
        </form>
        </Grid>
     
        </Grid>
       {/* </Grid> */}

       </form>
       
  
      

    );
  }
}

export default withStyles(styles, )(Chat);