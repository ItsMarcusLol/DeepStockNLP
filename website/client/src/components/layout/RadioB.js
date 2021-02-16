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

  var stock = selectedValue;

  
  console.log("1" + selectedValue)
  console.log("2 " + stock)

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    stock = event.target.name;
  };
 
  return (
   
    <div>
        <div>
          {console.log("here in  " + stock)}
          
        <DayPriceGraph  symb ={stock}/>
        {console.log("here in 2  " + stock)}
        </div>
        <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="GOOGL"
        inputProps={{ 'aria-label': 'A' }}
        size="small"
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="BA"
        inputProps={{ 'aria-label': 'B' }}
        size="small"
      />
      <GreenRadio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        value="c"
        name="WMT"
        inputProps={{ 'aria-label': 'C' }}
        size="small"
      />
      <Radio
        checked={selectedValue === 'd'}
        onChange={handleChange}
        value="d"
        color="default"
        name="AMZN"
        inputProps={{ 'aria-label': 'D' }}
        size="small"
      />
      <Radio
        checked={selectedValue === 'e'}
        onChange={handleChange}
        value="e"
        color="default"
        name="TSLA"
        inputProps={{ 'aria-label': 'E' }}
        size="small"
      />
       <Radio
        checked={selectedValue === 'f'}
        onChange={handleChange}
        value="f"
        name="MSFT"
        inputProps={{ 'aria-label': 'F' }}
        size="small"
      />
      <Radio
        checked={selectedValue === 'g'}
        onChange={handleChange}
        value="g"
        name="F"
        inputProps={{ 'aria-label': 'G' }}
        size="small"
      />
      <GreenRadio
        checked={selectedValue === 'h'}
        onChange={handleChange}
        value="h"
        name="DELL"
        inputProps={{ 'aria-label': 'H' }}
        size="small"
      />
      <Radio
        checked={selectedValue === 'i'}
        onChange={handleChange}
        value="i"
        color="default"
        name="TGT"
        inputProps={{ 'aria-label': 'I' }}
        size="small"
      />
      <Radio
        checked={selectedValue === 'j'}
        onChange={handleChange}
        value="j"
        color="default"
        name="APPL"
        inputProps={{ 'aria-label': 'J' }}
        size="small"
      />
      </div>
    </div>
  );
};

