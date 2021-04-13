import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
  const styles = (theme) => ({
  root: {
    width: '100%',
    // maxWidth: 800,
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
        /* To change the font, use the fontFamily rule */
  }
});

let chats = new Array()
let acctPts = new Map()
// chats.push("I think google will go up")
// acctPts.set('Jessie123', {stock: "Google", post:[ "I think Google stock will go up", "Def will go up", "High key will go up"]})
//acctPts.set('Hilary321', {stock: "Google", post: ["I think Google stock will go down", "I love Google stock"]})
//acctPts.set('GGG', {stock: "Google", post: ["I think Google stock will go up", " I make so much mmoney"]})
//acctPts.set('AAA', {stock: "Google", post: ["I think Google stock will go down"]})
//acctPts.set('Gund', {stock: "Google", post: ["I think Google stock will go up"]})
//acctPts.set('jodml', {stock: "Google", post:[ "I think Google stock will go down"]})
//acctPts.set('pearbear', {stock: "Google", post: ["I think Google stock will go up"]})
//acctPts.set('jimfod', {stock: "Google", post: ["I think Google stock will go down"]})
// acctPts..get('Jessie') // {phone: "213-555-1234", address: "123 N 1st Ave"}
// acctPts..delete('Raymond') // false

// class ChatList {
  class ChatList extends React.Component {
  //const classes = useStyles();

  keys = Array.from( acctPts.keys() );
  
  //const a = [1,2,4];
  

  newMessage() {
    fetch('http://104.196.230.228:80/forum/chat', {method: "GET"})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Error: " + response.status);
            } else {
              console.log(response.status);
              
              return response.json();
            }
          })
          .then( (obj) => {
            chats = Array.from(obj);
            // chats.push("I think google will go up")
          });

    var i;
    {console.log(chats)}
    for (i = 0; i < chats.length; i++) {
      acctPts.set(chats[i].username, {stock: "null", post: [chats[i].text]});
    }
  
  }

  render() {
    const {classes} = this.props;
    this.newMessage();
    // var keys = Array.from( acctPts.keys() );
  return (
    <List className={classes.root} subheader={<li />}>

      {/* {[0, 1, 2, 3, 4].map((sectionId) => ( */}
         {this.keys.map((sectionId) => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader classes={{root:classes.listSubHeaderRoot}}>{` ${sectionId}`}</ListSubheader >

            {/* {keys.map((item) => ( */}


              {(acctPts.get(sectionId).post).map((p) => (
                 
                <ListItem key={`item-${sectionId}-`}>
                <ListItemText primary={` ${acctPts.get(sectionId).stock}: ${p}`} />
              
                
              </ListItem> 

             )
             
             )
             
             }
             <Divider />

              


              {/* <ListItem key={`item-${sectionId}-`}>
                <ListItemText primary={` ${acctPts.get(sectionId).stock}: ${acctPts.get(sectionId).post}`} />
              </ListItem> */}

            {/* ))} */}
          </ul>
        </li>
      ))}

    </List>
  );
            }
}

export default withStyles(styles, )(ChatList);