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

  // keys = Array.from( acctPts.keys() );
  
  //const a = [1,2,4];
  

  // newMessage() {
  //   fetch('http://104.196.230.228:80/forum/chat', {method: "GET"})
  //         .then( (response) => {
  //           if ( response.status !== 200) {
  //             console.log("Error: " + response.status);
  //           } else {
  //             console.log(response.status);
              
  //             return response.json();
  //           }
  //         })
  //         .then( (obj) => {
  //           console.log(obj)
  //           chats = obj;
  //           // chats.push("I think google will go up")
  //         });

  //   var i;
  //   // acctPts.set(chats[0][0], {stock: "null", post: [chats[0][1]});
  //   // acctPts.set(chats[1][0], {stock: "null", post: [chats[1][1]});
  //   {console.log(chats)}
  //   for (i = 0; i < chats.length; i++) {
  //     console.log(chats[i][1])
  //     acctPts.set(chats[i][0], [chats[i][1]]);

  //   }
  // console.log(acctPts)
  // console.log(acctPts.get('Jeff'))
  
  // }
  // acctPts = new Map();
    
  //   makeMap(chats ){
  //       console.log("hello")
  //   var i;
   
  //   var map = new Map();
  //   console.log(chats)
  //   console.log(chats.length)
  //   if (chats.length != 0){
  //      for (i = 0; i < chats.length; i++) {
  //       console.log(chats[i][1])
  //       // map.set(chats[i][0], chats[i][1]);
  //       var j;
  //       var posts = []
  //       for (j  = 1; j < chats[i].length; j ++){
  //         posts.push(chats[i][j])
         
  //       }
        
  //       map.set(chats[i][0], posts);
  //    }
  //    console.log(map)
  //   // this.setState({acctPts:map});
    
  //     console.log("here")
  //     // console.log(this.state.acctPts)
  //     //  console.log(acctPts.get('Jeff'))
  //   }
  // return map;
  //   }

  

  render() {
    const {classes} = this.props;
    var chats = this.props.cList;
   
    // this.acctPts = this.makeMap(chats)
    // console.log(this.acctPts)
    // if (acctPts == null){
    //   acctPts = new Map()
    //   acctPts.set('', [" "]);
    // }

    // console.log(acctPts.keys.length)
    // var keys = Array.from( acctPts.keys() );
    // var keys = new Array();
    // keys = Array.from(this.acctPts.keys());
    // var i;
    // console.log(keys)
    // for (i = 0; i < acctPts.length; i++){
    //   keys[i] = acctPts[i][0];
    //   console.log(keys[i])
    // }
    console.log(chats)

  return (
    <List className={classes.root} subheader={<li />}>

      {/* {[0, 1, 2, 3, 4].map((sectionId) => ( */}
         {chats.map((sectionId) => (
           console.log(sectionId[0]),
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader classes={{root:classes.listSubHeaderRoot}}>{` ${sectionId[0]}`}</ListSubheader >
            <ListItemText primary={` ${sectionId[1]}`} />
            <Divider />
              {/* {(acctPts.get(sectionId).post).map((p) => (
                 
                <ListItem key={`item-${sectionId}-`}>
                <ListItemText primary={` ${acctPts.get(sectionId).stock}: ${p}`} />
              
                
              </ListItem> 

             )
             
             )
             
             }
             <Divider /> */}

              


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