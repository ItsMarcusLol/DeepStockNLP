import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import DayPriceGraph from './DayPriceGraph';



const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');
  var symbol = selectedValue;

  
  // console.log("1" + selectedValue)
  // console.log("2 " + stock)

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    symbol = event.target.name;
  };
 
  return (
    <div>
        <DayPriceGraph  symb ={symbol}/>
        <div>
          {/* {console.log("here in  " + stock)} */}
          
        {/* <DayPriceGraph  symb ={selectedValue}/> */}
        {/* {console.log("here in 2  " + stock)} */}
        </div>
        <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="GOOGL"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="APPL"
        inputProps={{ 'aria-label': 'B' }}
        
      />
      <GreenRadio 
        checked={selectedValue === 'c'}
        onChange={handleChange}
        value="c"
        name="BA"
        inputProps={{ 'aria-label': 'C' }}
        
      />
      <Radio
        checked={selectedValue === 'd'}
        onChange={handleChange}
        value="d"
        color="default"
        name="WMT"
        inputProps={{ 'aria-label': 'D' }}
        
      />
      <Radio
        checked={selectedValue === 'e'}
        onChange={handleChange}
        value="e"
        color="default"
        name="AMZN"
        inputProps={{ 'aria-label': 'E' }}
        
      />
       <Radio
        checked={selectedValue === 'f'}
        onChange={handleChange}
        value="f"
        name="TSLA"
        inputProps={{ 'aria-label': 'F' }}
        
      />
      <Radio
        checked={selectedValue === 'g'}
        onChange={handleChange}
        value="g"
        name="MSFT"
        inputProps={{ 'aria-label': 'G' }}
        
      />
      <GreenRadio
        checked={selectedValue === 'h'}
        onChange={handleChange}
        value="h"
        name="F"
        inputProps={{ 'aria-label': 'H' }}
        
      />
      <Radio
        checked={selectedValue === 'i'}
        onChange={handleChange}
        value="i"
        color="default"
        name="DELL"
        inputProps={{ 'aria-label': 'I' }}
        
      />
      <Radio
        checked={selectedValue === 'j'}
        onChange={handleChange}
        value="j"
        color="default"
        name="TGT"
        inputProps={{ 'aria-label': 'J' }}
        
      />
      </div>
    </div>
  );
};

