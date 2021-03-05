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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ChatList from './ChatList';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// export default function Chat() {
  export default class PriceTable extends React.Component {


    state = {
      loading: true, 
      prices: null,
  };

  async componentDidMount() {
    
      const data = "'hiS"
      

    console.log(data)
      this.setState({ posts:data, loading: false});
  }
  // classes = useStyles();


  render() {
    // if (this.state.loading){
    //     return <LoadingSymbol />
    // }

  return (
    <div>
          <form  noValidate autoComplete="off">
          {/* <form className={classes.root} noValidate autoComplete="off"> */}
       {/* <List className={classes.root}> */}
      
      <ChatList/>
    
    
   
      <TextField id="outlined-basic" label="Outlined"  multiline rows = {5} variant="outlined"/>
      <Button
          variant="contained"
          color="primary"
        //   className={classes.button}
          endIcon={<Icon>send</Icon>}
          
          
        >
          Send
        </Button>
    </form>
    </div>
  );
}
  }
