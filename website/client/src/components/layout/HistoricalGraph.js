import React, { PureComponent } from 'react';
import {
  Line, LineChart, XAxis, YAxis, Label, CartesianGrid, Tooltip
} from 'recharts';

function createData(time, amount) {
    return { time, amount };
  }
  
  const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
  ];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  
  state = {
    //loading: true, 
    //prices: null,
    symbol:  this.props.symb,
};

// async componentDidMount() {
  
  
    
  
//     // const key = "f0448bd30a7028e245052fcf3caa0837";
//     const key = "insert key"
//     const sym = this.state.symbol
//     var url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+sym+"?timeseries=30&apikey=" + key;
//     var response = await fetch(url);
//     var data = await response.json();
   
//     data = data['historical']

//    // console.log("here "+symbol);
//     console.log(this.state.symbol)
//     this.setState({ prices:data,  loading: false});
// }

  render() {
    console.log("Day Price Graph: " ,this.props.symb)
    return (
      <div> 
      {/* <h1>Historical Prices</h1> */}
      <LineChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis>
            <Label
                angle={270}
                position="left"
                sylte={{ textAnchor: 'middle'}} >
                    Prices ($)
                </Label>
        </YAxis>
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="amount" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
      </div> 
    );
  }
}

