import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import HistoricalPriceGraph from './HistoricalPriceGraph';

const GreenRadio = withStyles({
  root: {
    color:  '#71FF00',
    '&$checked': {
      color:  '#71FF00',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default class RadioButtons extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
   selectedValue: '',
   ticker: '',
   sData:null,
   loading: true

  };

  this.handleChange = this.handleChange.bind(this);
}

async getData(t){

  const key = "f0448bd30a7028e245052fcf3caa0837";
  
  await this.setState({ticker: t})
  var url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+this.state.ticker+"?timeseries=30&apikey=" + key;
  var response = await fetch(url);
  var data = await response.json();

  data = data['historical']
  await this.setState({ sData:data,  loading: false});
}

   handleChange = (event) => {
    this.setState({selectedValue: event.target.value})
    this.getData(event.target.name)
}


async componentDidMount() {
  this.setState({ selectedValue:'Google', ticker: 'GOOGL'});
  this.getData('GOOGL')
  };

  render(){
  return (
    <div>
      <HistoricalPriceGraph 
      symb={this.state.selectedValue}
      data = {this.state.sData}
      
      />

      <div
   style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
      <GreenRadio
        checked={this.state.selectedValue === 'Google'}
        onChange={(e) => this.handleChange(e) }
        value="Google"
        name="GOOGL"
        inputProps={{ 'aria-label': 'A' }}
      />
      <GreenRadio
        checked={this.state.selectedValue === 'Apple'}
        onChange={(e) =>this.handleChange(e) }
        value="Apple"
        name="AAPL"
        inputProps={{ 'aria-label': 'B' }}
      />
      <GreenRadio
        checked={this.state.selectedValue === 'Boeing'}
        onChange={(e) =>this.handleChange(e) }
        value="Boeing"
        name="BA"
        inputProps={{ 'aria-label': 'C' }}
      />
      <GreenRadio
        checked={this.state.selectedValue === 'Walmart'}
        onChange={(e) =>this.handleChange(e) }
        value="Walmart"
        name="WMT"
        inputProps={{ 'aria-label': 'D' }}
      />
      <GreenRadio
        checked={this.state.selectedValue === 'Amazon'}
        onChange={(e) =>this.handleChange(e) }
        value="Amazon"
        name="AMZN"
        inputProps={{ 'aria-label': 'E' }}
      />    
      <GreenRadio
        checked={this.state.selectedValue === 'Tesla'}
        onChange={(e) =>this.handleChange(e) }
        value="Tesla"
        name="TSLA"
        inputProps={{ 'aria-label': 'F' }}
      />  
      <GreenRadio
        checked={this.state.selectedValue === 'Microsoft'}
        onChange={(e) =>this.handleChange(e) }
        value="Microsoft"
        name="MSFT"
        inputProps={{ 'aria-label': 'G' }}
      />
      <GreenRadio
        checked={this.state.selectedValue === 'Ford'}
        onChange={(e) =>this.handleChange(e) }
        value="Ford"
        name="F"
        inputProps={{ 'aria-label': 'H' }}
      />
      <GreenRadio
        checked={this.state.selectedValue === 'Dell'}
        onChange={(e) =>this.handleChange(e) }
        value="Dell"
        name="DELL"
        inputProps={{ 'aria-label': 'I' }}
      />
      <GreenRadio
        checked={this.state.selectedValue === 'Target'}
        onChange={(e) =>this.handleChange(e) }
        value="Target"
        name="TGT"
        inputProps={{ 'aria-label': 'J' }}
      />
      </div>
    </div>
  )
  };
}