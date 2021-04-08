import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import HistoricalPriceGraph from './HistoricalPriceGraph';

const BlueRadio = withStyles({
  root: {
    color: "#1CE",
    '&$checked': {
      color: "#1CE",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default class RadioButtons extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
   selectedValue: 'Google'

  };

  this.handleChange = this.handleChange.bind(this);
}

   handleChange = (event) => {
    this.setState({selectedValue: event.target.value})
    console.log(this.state.selectedValue)
  };

  render(){
  return (
    <div>

      <HistoricalPriceGraph symb={this.state.selectedValue}/>

      <div
   style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
      <BlueRadio
        checked={this.state.selectedValue === 'Google'}
        onChange={(e) => this.handleChange(e) }
        value="Google"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
      <BlueRadio
        checked={this.state.selectedValue === 'Apple'}
        onChange={(e) =>this.handleChange(e) }
        value="Apple"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
      />
      <BlueRadio
        checked={this.state.selectedValue === 'Boeing'}
        onChange={(e) =>this.handleChange(e) }
        value="Boeing"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'C' }}
      />
      <BlueRadio
        checked={this.state.selectedValue === 'Walmart'}
        onChange={(e) =>this.handleChange(e) }
        value="Walmart"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'D' }}
      />
      <BlueRadio
        checked={this.state.selectedValue === 'Amazon'}
        onChange={(e) =>this.handleChange(e) }
        value="Amazon"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'E' }}
      />    
      <BlueRadio
        checked={this.state.selectedValue === 'Tesla'}
        onChange={(e) =>this.handleChange(e) }
        value="Tesla"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'F' }}
      />  
      <BlueRadio
        checked={this.state.selectedValue === 'Microsoft'}
        onChange={(e) =>this.handleChange(e) }
        value="Microsoft"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'G' }}
      />
      <BlueRadio
        checked={this.state.selectedValue === 'Ford'}
        onChange={(e) =>this.handleChange(e) }
        value="Ford"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'H' }}
      />
      <BlueRadio
        checked={this.state.selectedValue === 'Dell'}
        onChange={(e) =>this.handleChange(e) }
        value="Dell"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'I' }}
      />
      <BlueRadio
        checked={this.state.selectedValue === 'Target'}
        onChange={(e) =>this.handleChange(e) }
        value="Target"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'J' }}
      />
      </div>
    </div>
  )
  };
}