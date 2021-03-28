import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    
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
}));


let acctPts = new Map()
acctPts.set('Jessie123', {stock: "Google", post:[ "I think Google stock will go up", "Def will go up", "High key will go up"]})
acctPts.set('Hilary321', {stock: "Google", post: ["I think Google stock will go down", "I love Google stock"]})
acctPts.set('GGG', {stock: "Google", post: ["I think Google stock will go up", " I make so much mmoney"]})
acctPts.set('AAA', {stock: "Google", post: ["I think Google stock will go down"]})
acctPts.set('Gund', {stock: "Google", post: ["I think Google stock will go up"]})
acctPts.set('jodml', {stock: "Google", post:[ "I think Google stock will go down"]})
acctPts.set('pearbear', {stock: "Google", post: ["I think Google stock will go up"]})
acctPts.set('jimfod', {stock: "Google", post: ["I think Google stock will go down"]})
// acctPts..get('Jessie') // {phone: "213-555-1234", address: "123 N 1st Ave"}
// acctPts..delete('Raymond') // false

console.log(acctPts.get("Jessie123"))
console.log(acctPts.get("Jessie123").post)

export default function PinnedSubheaderList() {
  const classes = useStyles();

//   const keys = acctPts.keys();
  let keys = Array.from( acctPts.keys() );

  const a = [1,2,4];

  console.log(a)

  console.log(acctPts.keys())

  return (
    <List className={classes.root} subheader={<li />}>

      {/* {[0, 1, 2, 3, 4].map((sectionId) => ( */}
         {keys.map((sectionId) => (
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