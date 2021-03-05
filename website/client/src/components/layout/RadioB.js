import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import DayPriceGraph from './DayPriceGraph';
import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';


const BlueRadio = withStyles({
  root: {
    color: "blue",
    '&$checked': {
      color: "blue",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('Ford');
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
      <BlueRadio
        checked={selectedValue === 'Google'}
        onChange={handleChange}
        value="Google"
        name="GOOGL"
        // color="blue"
        inputProps={{ 'aria-label': 'A' }}
      />
      <BlueRadio
        checked={selectedValue === 'Apple'}
        onChange={handleChange}
        value="Apple"
        name="APPL"
        // color="blue"
        inputProps={{ 'aria-label': 'B' }}
        
      />
      <BlueRadio
        checked={selectedValue === 'Boeing'}
        onChange={handleChange}
        value="Boeing"
        name="BA"
        // color="default"
        inputProps={{ 'aria-label': 'C' }}
        
      />
      <BlueRadio
        checked={selectedValue === 'Walmart'}
        onChange={handleChange}
        value="Walmart"
        // color="default"
        name="WMT"
        inputProps={{ 'aria-label': 'D' }}
        
      />
      <BlueRadio
        checked={selectedValue === 'Amazon'}
        onChange={handleChange}
        value="Amazon"
        // color="default"
        name="AMZN"
        inputProps={{ 'aria-label': 'E' }}
        
      />
       <BlueRadio
        checked={selectedValue === 'Tesla'}
        onChange={handleChange}
        value="Tesla"
        name="TSLA"
        // color="default"
        inputProps={{ 'aria-label': 'F' }}
        
      />
      <BlueRadio
        checked={selectedValue === 'Microsoft'}
        onChange={handleChange}
        value="Microsoft"
        name="MSFT"
        // color="default"
        inputProps={{ 'aria-label': 'G' }}
        
      />
      <BlueRadio
        checked={selectedValue === 'Ford'}
        onChange={handleChange}
        value="Ford"
        name="F"
        // color="default"
        inputProps={{ 'aria-label': 'H' }}
        
      />
      <BlueRadio
        checked={selectedValue === 'Dell'}
        onChange={handleChange}
        value="Dell"
        // color="default"
        name="DELL"
        inputProps={{ 'aria-label': 'I' }}
        
      />
      <BlueRadio
        checked={selectedValue === 'Target'}
        onChange={handleChange}
        value="Target"
        // color="default"
        name="TGT"
        inputProps={{ 'aria-label': 'J' }}
        
      />
      </div>
    </div>
  );
};

