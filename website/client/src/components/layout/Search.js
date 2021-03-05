import Icon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchTable from './SearchTable';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


 export default function Search() {
   
  
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  {console.log(title)}
    
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{title}</h2>
      <p id="simple-modal-description">
         <SearchTable symb = {title}/>
      </p>
    </div>
  );



  return (
    <div>
      
      
      <TextField
          onChange={(e) => {
            setTitle(e.target.value) 
            setText(e.target.value)}}
          id="standard-search"
          label="Search"
          style={{ margin: 8 }}
          placeholder="Search"
          helperText="Stock Search"
          fullWidth="true"
          margin="normal"
          type="search"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value = {text}
        />

       
      <Button type="button" 
      onClick={() => {
        handleOpen() 
        setText("")
      }}
      variant="contained"
                color="primary"
      //         //   className={classes.button}
                endIcon={<Icon>send</Icon>}
      >
        Search
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

