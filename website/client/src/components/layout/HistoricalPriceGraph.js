import React, { PureComponent } from 'react';
import {
  Line, LineChart, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
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
      <h1 style={{color:'white'}}> {this.props.symb}:</h1>
      <ResponsiveContainer width='100%'  aspect={4.0/2.0}>
      <LineChart
        width={650}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#FFF"/>
        <YAxis
          stroke="#FFF">
            <Label
                angle={270}
                position="left"
                sylte={{ textAnchor: 'middle'}} 
                stroke="#FFFFFF"
                fontSize="17"
                fontFamily="normal"
                >
                    Prices ($)
                </Label>
        </YAxis>
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="Volume" stroke="#82ca9d" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="Low" stroke="red" />
        <Line type="monotone" dataKey="Volume" stroke="#8884d8" /> */}

      </LineChart>
      </ResponsiveContainer>
      </div> 
    );
  }
}





// /*
// This graph was taken from the website and for more deatils go to

// https://medium.com/how-to-react/create-a-stock-chart-in-react-js-677be5f2f356

// and you might need to install 

// npm i react-highcharts moment --save

// but right now the data comes from historicalPriceData.json and only holds 3 months of dummy data so 
// the other buttons will be off right now since the data only goes back 3 months. When we get real data
// it has to be in the format of [timestamp, price] for this to work. Feel free to change this graph if you 
// guys would like and go back to the day price graph.
// */

// import React, { Component } from 'react';
// import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
// import priceData from './historicalPriceData.json';
// import moment from 'moment';

// export default class Example extends Component {
//   render() {
//     const options = {style: 'currency', currency: 'USD'};
//     const numberFormat = new Intl.NumberFormat('en-US', options);
//     const configPrice = {

//       yAxis:[{
//         offset: 20,

//         labels: {
//           formatter: function() {
//             return numberFormat.format(this.value)
//           }
//           ,
//           x: -15,
//           style: {
//             "color": "#000", "position": "absolute"
//           },
//           align: 'left'
//         },
//       },
//     ],
//     tooltip: {
//       shared: true,
//       formatter: function() {
//         return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMM do YYYY, h:mm')
//       }
//     },
//     plotOptions: {
//       series: {
//         showInNavigator: true,
//         gapSize: 6,
//       }
//     },
//     rangeSelector: {
//       selected: 1
//     },
//     title: {
//       text: this.props.symb
//     },
//     chart: {
//       height: 600,
//     },
//     credits: {
//       enabled: false
//     },
//     legend: {
//       enabled: false
//     },
//     xAxis: {
//       type: 'date',
//     },
//     rangeSelector: {
//       buttons: [{
//         type: 'day',
//         count: 1,
//         text: '1D'
//       }, {
//         type: 'day',
//         count: 5,
//         text: '5D'
//       }, {
//         type: 'month',
//         count: 1,
//         text: '1M'
//       }, {
//         type: 'month',
//         count: 6,
//         text: '6M'
//       }, {
//         type: 'year',
//         count: 1,
//         text: '1Y'
//       }, {
//         type: 'year',
//         count: 5,
//         text: '5Y'
//       }, {
//         type: 'all',
//         text: 'Max'
//       }],
//       selected: 4
//     },
//     series: [{
//       name: 'Price',
//       type: 'spline',

//       data: priceData,
//       tooltip: {
//         valueDecimals: 2
//       },
//     }]
//     };
//     return (
//       <div>
//           <ReactHighcharts config = {configPrice}></ReactHighcharts>
//       </div>
//     )
//   }
// }
