import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Icon from '@material-ui/icons/Send';
// import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
// import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Search() {
  const classes = useStyles();

  return (
    
    // <div>
        <Grid container spacing={2}>
                 <Grid item xs={12}>
                  
          <h1>Search for a stock:</h1>
    </Grid>
      {/* <TextField id="outlined-basic" label="Search" variant="outlined" labelWidth={30} /> */}
     <Grid item xs={8}> 
     
      <div >
      <TextField
          id="outlined-full-width"
          label="Search"
          style={{ margin: 8 }}
          placeholder="Search"
          helperText="Stock Search"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
         </div>
       </Grid>
         <Grid item xs={4}> 
       <div>
      <Button
          variant="contained"
          color="primary"
        //   className={classes.button}
          endIcon={<Icon>send</Icon>}
        >
          Search
        </Button>
        </div>
        
         </Grid>
        </Grid> 
    // </div>
    
  );
}
