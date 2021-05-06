import Icon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchTable from './SearchTable';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

function getModalStyle() {
    const top = 60;
    const left = 60;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

  const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});


class Search extends React.Component {

  state = {
    loading: false, 
    open: null, 
    title: "", 
    text: "", 
    output: null
    
  
  };
  
  modalStyle = getModalStyle();
  

  handleOpen = () => {
    this.setState({
      open: true
    });
    console.log(this.state.open)
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  setText = (e) => {
    this.setState({
      text: e
    });
  };

  setTitle = (e) => {
    this.setState({
      title: e
    });
  };

  render(){
    const {classes} = this.props;

    const body = (
      <div style={this.modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">You searched: {this.state.title}</h2>
        <p id="simple-modal-description">
           <SearchTable symb = {this.state.title}
           />
        </p>
      </div>
    );
  return (
    <div>
      
      <Grid container spacing={1}>
          <Grid item xs={9}
           container
           direction="row"
           justify="center"
           alignItems="center"
           >
      <TextField
          onChange={(e) => {
            this.setTitle(e.target.value) 
            this.setText(e.target.value)}}
          id="standard-search"
          label="Search"
          style={{ margin: 4 }}
          placeholder="Search NYSE or NASDAQ"
          fullWidth="true"
          margin="normal"
          type="search"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value = {this.state.text}
        />
        </Grid>
       <Grid xs = {2} sm = {3}
       container
       direction="row"
       justify="center"
       alignItems="center">
      <Button type="button" 
      onClick={() => {
        this.handleOpen()
        this.setText("")
      }}
      variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
      >
        Search
      </Button>
      </Grid>
      </Grid>
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
   
    </div>
  );
}
}

export default withStyles(styles, )(Search);
