import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import DayPriceGraph from './DayPriceGraph';
import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import { ThreeSixty } from '@material-ui/icons';


const BlueRadio = withStyles({
  root: {
    color: "blue",
    '&$checked': {
      color: "blue",
    },
  },
  // checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('Google');
  // const [selectedStock, setSelectedStock] = React.useState('Apple');
  var symbol = selectedValue;

  const handleChange = event => {
    setSelectedValue(event.target.value);
    symbol = event.target.name;
  }

  // const handleClick = (event) => {
  //   setSelectedValue(event.target.value);
  //   symbol = event.target.name;
  // };

  // const handleChange = changeEvent => {
  //   this.setState({
  //     setSelectedValue: changeEvent.target.value,
  //     // symbol: changeEvent.target.name
  //   });
  //   // symbol = changeEvent.target.name;
  // };
 
  return (
    <div>
        <DayPriceGraph symb={symbol}/>
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
        onClick={() => setSelectedValue({ selectedValue:'Google'})}
        inputProps={{ 'aria-label': 'A' }}
      />
      <BlueRadio
        checked={selectedValue === 'Apple'}
        onChange={handleChange}
        value="Apple"
        name="APPL"
        onClick={() => setSelectedValue({ selectedValue: 'Boeing'})}
        inputProps={{ 'aria-label': 'B' }}
      />
      <BlueRadio
        checked={selectedValue === 'Boeing'}
        onChange={handleChange}
        value="Boeing"
        name="BA"
        onClick={() => setSelectedValue({ selectedValue: 'Boeing'})}
        inputProps={{ 'aria-label': 'C' }}
      />
      <BlueRadio
        checked={selectedValue === 'Walmart'}
        onChange={handleChange}
        value="Walmart"
        name="WMT"
        onClick={() => setSelectedValue({ selectedValue: 'Walmart'})}
        inputProps={{ 'aria-label': 'D' }}
      />
      <BlueRadio
        checked={selectedValue === 'Amazon'}
        onChange={handleChange}
        value="Amazon"
        name="AMZN"
        onClick={() => setSelectedValue({ selectedValue: 'Amazon'})}
        inputProps={{ 'aria-label': 'E' }}
      />
       <BlueRadio
        checked={selectedValue === 'Tesla'}
        onChange={handleChange}
        value="Tesla"
        name="TSLA"
        onClick={() => setSelectedValue({ selectedValue: 'Tesla'})}
        inputProps={{ 'aria-label': 'F' }}
      />
      <BlueRadio
        checked={selectedValue === 'Microsoft'}
        onChange={handleChange}
        value="Microsoft"
        name="MSFT"
        onClick={() => setSelectedValue({ selectedValue: 'Microsoft'})}
        inputProps={{ 'aria-label': 'G' }}
      />
      <BlueRadio
        checked={selectedValue === 'Ford'}
        onChange={handleChange}
        value="Ford"
        name="F"
        onClick={() => setSelectedValue({ selectedValue: 'Ford'})}
        inputProps={{ 'aria-label': 'H' }}
      />
      <BlueRadio
        checked={selectedValue === 'Dell'}
        onChange={handleChange}
        value="Dell"
        name="DELL"
        onClick={() => setSelectedValue({ selectedValue: 'Dell'})}
        inputProps={{ 'aria-label': 'I' }}
      />
      <BlueRadio
        checked={selectedValue === 'Target'}
        onChange={handleChange}
        value="Target"
        name="TGT"
        onClick={() => setSelectedValue({ selectedValue: 'Target'})}
        inputProps={{ 'aria-label': 'J' }}
      />
      </div>
    </div>
  );
};

