// import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// // import Title from './Title';

// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];


// export default function DayPriceGraph() {
//   const theme = useTheme();

//   return (
//     // <React.Fragment>
//       //{/* <Title>Today</Title> */}
      
//      // {/* <ResponsiveContainer> */}
//         <LineChart
//           data={data}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
//           <YAxis stroke={theme.palette.text.secondary}>
//             <Label
//               angle={270}
//               position="left"
//               style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
//             >
//               Sales ($)
//             </Label>
//           </YAxis>
//           <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
//         </LineChart>
//       //{/* </ResponsiveContainer> */}
//     //{/* </React.Fragment> */}
    
//   );
// }

// // export default DayPriceGraph;
// // © 2021 GitHub, Inc.

import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: '6:30', Low: 1125, High: 2400, Volume: 2400,
  },
  {
    name: '7:00', Low: 1929, High: 3848, Volume: 2939,
  },
  {
    name: '7:30', Low: 1400, High: 1398, Volume: 2210,
  },
  {
    name: '8:00', Low: 2939, High: 3949, Volume: 2838,
  },
  {
    name: '8:30', Low: 1342, High: 9800, Volume: 2290,
  },
  {
    name: '9:00', Low: 2883, High: 9393, Volume: 2949,
  },
  {
    name: '9:30', Low: 1123, High: 3908, Volume: 2000,
  },
  {
    name: '10:00', Low: 1929, High: 3483, Volume: 3929,
  },
  {
    name: '10:30', Low: 989, High: 4800, Volume: 2181,
  },
  {
    name: '11:00', Low: 1929, High: 4959, Volume: 3848
  },
  {
    name: '11:30', Low: 1005, High: 3800, Volume: 2500,
  },
  {
    name: '12:00', Low: 848, High: 4858, Volume: 2394,
  },
  {
    name: '12:30', Low: 1234, High: 4300, Volume: 2100,
  },
  {
    name: '1:00', Low: 1394, High: 2939, Volume: 3949,
  },
  {
    name: '1:00', Low: 2030, High: 3849, Volume: 2393,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  state = {
    loading: true, 
    prices: null,
    symbol: null
};

async componentDidMount() {
  
  
    const symbol = this.props.symb;
    console.log(symbol);
    // const key = "f0448bd30a7028e245052fcf3caa0837";
    const key = "insert key"
  
    var url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+symbol+"?timeseries=30&apikey=" + key;
    var response = await fetch(url);
    var data = await response.json();
   
    data = data['historical']

    console.log("here "+symbol);
    console.log(this.state.symbol)
    this.setState({ prices:data, symbol:symbol, loading: false});
}

  render() {
    return (
      <div> 
      <h1> {this.state.symbol} :</h1>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="High" stroke="#82ca9d" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="Low" stroke="red" />
        <Line type="monotone" dataKey="Volume" stroke="#8884d8" /> */}
      </LineChart>
      </div> 
    );
  }
}
