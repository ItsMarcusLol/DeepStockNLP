import React, { PureComponent } from 'react';
import {
  Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts';

/**
 * Creates the pop up box contents on the historical price graph
 * so that it shows the open price, close price, change in price
 * from the day before, and the date.
 * @param {*} param0 
 */
function CustomTooltip({ payload, label, active }) {
  if (active && payload != null) {
    return (
     
      <div style={{backgroundColor: '#228B22', fontSize:"17px", color:"white", width: '100%', padding: '5px' }}>
       
        <p className="label">{`Date: ${label}`}</p>
        <p className="label"> {`Change: ${payload[0].payload.change}`}</p>
        <p className="desc">Open: {payload[0].payload.open}</p>
        <p className="desc">Close: {payload[0].payload.close}</p>
      </div>
     
    );
  }
  return null;
}

/**
 * Gets data using an API call and creates
 * a graph for each of the 10 stocks we've chosen
 * showing the most recent months worth of historical data
 * in a line graph.
 */
export default class HistoricalPriceGraph extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  
  constructor(props) {
    super(props);
    this.state = {
      prices: this.props.data,
      symbol:  'Google',
      ticker: 'GOOGL'
  
    };
    this.setState({ symbol: this.props.symb,  data:this.props.data}); 
  }

  render() {
    if (!this.props.data) {
      return <span>Loading...</span>;
  }
    return (
      <div> 
      <h1 style={{color:'white'}}> {this.props.symb}:</h1>
      <ResponsiveContainer width='100%'  aspect={4.0/2.0}>
      <LineChart
        width={650}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#FFF" reversed="true"/>
        <YAxis
          stroke="#FFF">
            <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fontFamily: 'monospace'}} 
                stroke="#FFF"
                fontSize="18"
                >
                    Change In Price
                </Label>
        </YAxis>
        
        <Tooltip content={<CustomTooltip/>} />

        <Line type="monotone" strokeWidth="3" dataKey="change" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
      </div> 
    );
  }
}
