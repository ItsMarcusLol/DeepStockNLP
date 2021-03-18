// import React from 'react';
// // import { withStyles } from '@material-ui/core/styles';
// // import { green } from '@material-ui/core/colors';
// import Radio from '@material-ui/core/Radio';
import DayPriceGraph from './DayPriceGraph';
// // import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
// // import FormLabel from '@material-ui/core/FormLabel';
// // import classes from '*.module.scss';
// // import { render } from '@testing-library/react';
// //import { withStyles } from '@material-ui/core/styles';

// // const BlueRadio = withStyles({
// //   root: {
// //     color: "blue",
// //     '&$checked': {
// //       color: "blue",
// //     },
// //   },
// //   checked: {},
// // })((props) => <Radio color="default" {...props} />);




// class RadioB extends React.component {
//   //const [selectedValue, setSelectedValue] = React.useState('Google');
//  // symbol = selectedValue;

 

//   constructor(props) {
//     super(props);
//     this.state = {
//       symbol: 'Google',
//       selectedValue: 'Google'

//     };

//     //const [selectedValue, setSelectedValue] = React.useState('Google');
//     this.handleChange = this.handleChange.bind(this);
//   }

  
//   //const [selectedValue, setSelectedValue] = React.useState('Google');

//   handleChange = (event) => {
//     //setSelectedValue(event.target.value);
//     this.setState({selectedValue: event.target.value})
//   };
  
//   // console.log("1" + selectedValue)
//   // console.log("2 " + stock)

//   // handleChange = (event) => {
//   //   console.log(event);
//   //   setSelectedValue(event.target.value);
//   //   symbol = event.target.name;
//   //   console.log(symbol)
//   // };

//   // onChange = (e) =>   this.setState( this.setState({
//   //   symbol: e.target.name
//   // }))

 

// // export default function RadioButtonsGroup() {
// //   const [selectedValue, setValue] = React.useState('Apple');
// //   var symbol = selectedValue;

// //   const handleChange = (event) => {
// //     setValue(event.target.name);
// //     symbol = event.target.name;
// //   };
//     render(){
 
//       return (
//         <div>
            
//            {/* <div> */}
//             {/* <DayPriceGraph symb={symbol}/> */}
//               {/* {console.log("here in  " + stock)} */}
              
//             {/* <DayPriceGraph  symb ={selectedValue}/> */}
//             {/* {console.log("here in 2  " + stock)} */}
//            {/* // </div> */}
//             <div>
//           {/* <FormControl component="fieldset">
//             <FormLabel component="legend">Daily Prices</FormLabel>
//             <RadioGroup aria-label="Daily Prices" name="dailyPricesG" valeu={selectedValue} onChange={handleChange}>
//               <FormControlLabel value="GOOGL" control={<Radio />} label="Google" name="GOOGL"/>
//               <FormControlLabel value="APPL" control={<Radio />} label="Apple" name="APPL" />
//             </RadioGroup>
//           </FormControl> */}
//           <Radio
//              checked={this.state.selectedValue === 'Google'}
//             onChange={(e) => { this.handleChange(e)}}
//               //this.onChange(e)}}
//             value="Google"
//             name="GOOGL"
//             // color="blue"
//             inputProps={{ 'aria-label': 'A' }}
//           />
//           <Radio
//             checked={this.state.selectedValue === 'Apple'}
//              onChange={(e) => { this.handleChange(e) }}
//               // this.onChange(e)}}
//             value="Apple"
//             name="APPL"
//             // color="blue"
//             inputProps={{ 'aria-label': 'B' }}
            
//           />
//           {/* <BlueRadio
//             checked={selectedValue === 'Boeing'}
//             onChange={(e) => { handleChange(e)}}
//             value="Boeing"
//             name="BA"
//             // color="default"
//             inputProps={{ 'aria-label': 'C' }}
            
//           />
//           <BlueRadio
//             checked={selectedValue === 'Walmart'}
//             onChange={handleChange()}
//             value="Walmart"
//             // color="default"
//             name="WMT"
//             inputProps={{ 'aria-label': 'D' }}
            
//           />
//           <BlueRadio
//             checked={selectedValue === 'Amazon'}
//             onChange={handleChange}
//             value="Amazon"
//             // color="default"
//             name="AMZN"
//             inputProps={{ 'aria-label': 'E' }}
            
//           />
//           <BlueRadio
//             checked={selectedValue === 'Tesla'}
//             onChange={handleChange}
//             value="Tesla"
//             name="TSLA"
//             // color="default"
//             inputProps={{ 'aria-label': 'F' }}
            
//           />
//           <BlueRadio
//             checked={selectedValue === 'Microsoft'}
//             onChange={handleChange}
//             value="Microsoft"
//             name="MSFT"
//             // color="default"
//             inputProps={{ 'aria-label': 'G' }}
            
//           />
//           <BlueRadio
//             checked={selectedValue === 'Ford'}
//             onChange={handleChange}
//             value="Ford"
//             name="F"
//             // color="default"
//             inputProps={{ 'aria-label': 'H' }}
            
//           />
//           <BlueRadio
//             checked={selectedValue === 'Dell'}
//             onChange={handleChange}
//             value="Dell"
//             // color="default"
//             name="DELL"
//             inputProps={{ 'aria-label': 'I' }}
            
//           />
//           <BlueRadio
//             checked={selectedValue === 'Target'}
//             onChange={handleChange}
//             value="Target"
//             // color="default"
//             name="TGT"
//             inputProps={{ 'aria-label': 'J' }}
            
//           /> */}
//           </div>
//         </div>
//      );
//     }
//   }

//   export default RadioB;

  // export default withStyles(styles, )(RadioB);



import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  // checked: {},
})((props) => <Radio color="default" {...props} />);

export default class RadioButtons extends React.Component {
 // const [selectedValue, setSelectedValue] = React.useState('a');



 constructor(props) {
  super(props);
  this.state = {
   selectedValue: 'Google'

  };

  this.handleChange = this.handleChange.bind(this);
  // this.buttonChange = this.buttonChange.bind(this);
}

   handleChange = (event) => {
    //setSelectedValue(event.target.value);
    this.setState({selectedValue: event.target.value})
    console.log(this.state.selectedValue)
  };

  render(){
  return (
    <div>

      <DayPriceGraph symb={this.state.selectedValue}/>

      <Radio
        checked={this.state.selectedValue === 'a'}
        onChange={(e) => this.handleChange(e) }
        value="a"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={this.state.selectedValue === 'b'}
        onChange={(e) =>this.handleChange(e) }
        value="b"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
      />
      {/* <GreenRadio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        value="c"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'C' }}
      />
      <Radio
        checked={selectedValue === 'd'}
        onChange={handleChange}
        value="d"
        color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'D' }}
      />
      <Radio
        checked={selectedValue === 'e'}
        onChange={handleChange}
        value="e"
        color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'E' }}
        size="small"
      /> */}
    </div>
  )
  };
}