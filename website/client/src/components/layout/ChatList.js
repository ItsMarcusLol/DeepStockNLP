import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

  /**
   * Creates fontSizes, height, etc. for the chat box
   * @param {*} theme 
   */
  const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 538,
  },
  listSection: {
    backgroundColor: 'inherit',
    fontSize: 60,
  },
  listSubH: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0, 
  },
  listSubHeaderRoot: {
    backgroundColor: 'lightgray',
    color: '#252525',
    fontSize: 18,
    fontFamily: 'Arial'
  }
});

  /**
   * Posts the chat onto the chat box for everyone to read
   */
  class ChatList extends React.Component {
  render() {
    const {classes} = this.props;
     var chats = this.props.cList;
    if ( typeof(chats) === "undefined"){
      chats = [];
    }
    
  return (
    <List className={classes.root} subheader={<li />}>
         {chats.map((sectionId) => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader classes={{root:classes.listSubHeaderRoot}}>{` ${sectionId[0]}`}</ListSubheader >
            <ListItemText primary={` ${sectionId[1]}`} />
            <Divider />
          </ul>
        </li>
      ))}

    </List>
  );}
}

export default withStyles(styles, )(ChatList);