import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import DayPriceGraph from './DayPriceGraph';
import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';


// const GreenRadio = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Radio color="default" {...props} />);

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('Apple');
  var symbol = selectedValue;

  
  // console.log("1" + selectedValue)
  // console.log("2 " + stock)

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    symbol = event.target.name;
  };

// export default function RadioButtonsGroup() {
//   const [selectedValue, setValue] = React.useState('Apple');
//   var symbol = selectedValue;

//   const handleChange = (event) => {
//     setValue(event.target.name);
//     symbol = event.target.name;
//   };
 
  return (
    <div>
        <DayPriceGraph symb={symbol}/>
        <div>
          {/* {console.log("here in  " + stock)} */}
          
        {/* <DayPriceGraph  symb ={selectedValue}/> */}
        {/* {console.log("here in 2  " + stock)} */}
        </div>
        <div>
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">Daily Prices</FormLabel>
        <RadioGroup aria-label="Daily Prices" name="dailyPricesG" valeu={selectedValue} onChange={handleChange}>
          <FormControlLabel value="GOOGL" control={<Radio />} label="Google" name="GOOGL"/>
          <FormControlLabel value="APPL" control={<Radio />} label="Apple" name="APPL" />
        </RadioGroup>
      </FormControl> */}
      <Radio
        checked={selectedValue === 'Google'}
        onChange={handleChange}
        value="Google"
        name="GOOGL"
        color="default"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'Apple'}
        onChange={handleChange}
        value="Apple"
        name="APPL"
        color="default"
        inputProps={{ 'aria-label': 'B' }}
        
      />
      <Radio 
        checked={selectedValue === 'Boeing'}
        onChange={handleChange}
        value="Boeing"
        name="BA"
        color="default"
        inputProps={{ 'aria-label': 'C' }}
        
      />
      <Radio
        checked={selectedValue === 'Walmart'}
        onChange={handleChange}
        value="Walmart"
        color="default"
        name="WMT"
        inputProps={{ 'aria-label': 'D' }}
        
      />
      <Radio
        checked={selectedValue === 'Amazon'}
        onChange={handleChange}
        value="Amazon"
        color="default"
        name="AMZN"
        inputProps={{ 'aria-label': 'E' }}
        
      />
       <Radio
        checked={selectedValue === 'Tesla'}
        onChange={handleChange}
        value="Tesla"
        name="TSLA"
        color="default"
        inputProps={{ 'aria-label': 'F' }}
        
      />
      <Radio
        checked={selectedValue === 'Microsoft'}
        onChange={handleChange}
        value="Microsoft"
        name="MSFT"
        color="default"
        inputProps={{ 'aria-label': 'G' }}
        
      />
      <Radio
        checked={selectedValue === 'Ford'}
        onChange={handleChange}
        value="Ford"
        name="F"
        color="default"
        inputProps={{ 'aria-label': 'H' }}
        
      />
      <Radio
        checked={selectedValue === 'Dell'}
        onChange={handleChange}
        value="Dell"
        color="default"
        name="DELL"
        inputProps={{ 'aria-label': 'I' }}
        
      />
      <Radio
        checked={selectedValue === 'Target'}
        onChange={handleChange}
        value="Target"
        color="default"
        name="TGT"
        inputProps={{ 'aria-label': 'J' }}
        
      />
      </div>
    </div>
  );
};

