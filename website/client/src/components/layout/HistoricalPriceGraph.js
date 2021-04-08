// import React, { PureComponent } from 'react';
// import {
//   Line, LineChart, XAxis, YAxis, Label, CartesianGrid, Tooltip
// } from 'recharts';

// function createData(time, amount) {
//     return { time, amount };
//   }
  
//   const data = [
//     createData('00:00', 0),
//     createData('03:00', 300),
//     createData('06:00', 600),
//     createData('09:00', 800),
//     createData('12:00', 1500),
//     createData('15:00', 2000),
//     createData('18:00', 2400),
//     createData('21:00', 2400),
//     createData('24:00', undefined),
//   ];

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  
//   state = {
//     //loading: true, 
//     //prices: null,
//     symbol:  this.props.symb,
// };

// // async componentDidMount() {
  
  
    
  
// //     // const key = "f0448bd30a7028e245052fcf3caa0837";
// //     const key = "insert key"
// //     const sym = this.state.symbol
// //     var url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+sym+"?timeseries=30&apikey=" + key;
// //     var response = await fetch(url);
// //     var data = await response.json();
   
// //     data = data['historical']

// //    // console.log("here "+symbol);
// //     console.log(this.state.symbol)
// //     this.setState({ prices:data,  loading: false});
// // }

//   render() {
//     console.log("Day Price Graph: " ,this.props.symb)
//     return (
//       <div> 
//       {/* <h1>Historical Prices</h1> */}
//       <LineChart
//         width={900}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="time" />
//         <YAxis>
//             <Label
//                 angle={270}
//                 position="left"
//                 sylte={{ textAnchor: 'middle'}} >
//                     Prices ($)
//                 </Label>
//         </YAxis>
//         <Tooltip />
//         {/* <Legend /> */}
//         <Line type="monotone" dataKey="amount" stroke="#82ca9d" activeDot={{ r: 8 }} />
//       </LineChart>
//       </div> 
//     );
//   }
// }







/*
This graph was taken from the website and for more deatils go to

https://medium.com/how-to-react/create-a-stock-chart-in-react-js-677be5f2f356

and you might need to install 

npm i react-highcharts moment --save

but right now the data comes from historicalPriceData.json and only holds 3 months of dummy data so 
the other buttons will be off right now since the data only goes back 3 months. When we get real data
it has to be in the format of [timestamp, price] for this to work. Feel free to change this graph if you 
guys would like and go back to the day price graph.
*/

import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import priceData from './historicalPriceData.json';
import moment from 'moment';

export default class Example extends Component {
  render() {
    const options = {style: 'currency', currency: 'USD'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {

      yAxis:[{
        offset: 20,

        labels: {
          formatter: function() {
            return numberFormat.format(this.value)
          }
          ,
          x: -15,
          style: {
            "color": "#000", "position": "absolute"
          },
          align: 'left'
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: function() {
        return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMM do YYYY, h:mm')
      }
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
      }
    },
    rangeSelector: {
      selected: 1
    },
    title: {
      text: this.props.symb
    },
    chart: {
      height: 600,
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      type: 'date',
    },
    rangeSelector: {
      buttons: [{
        type: 'day',
        count: 1,
        text: '1D'
      }, {
        type: 'day',
        count: 5,
        text: '5D'
      }, {
        type: 'month',
        count: 1,
        text: '1M'
      }, {
        type: 'month',
        count: 6,
        text: '6M'
      }, {
        type: 'year',
        count: 1,
        text: '1Y'
      }, {
        type: 'year',
        count: 5,
        text: '5Y'
      }, {
        type: 'all',
        text: 'Max'
      }],
      selected: 4
    },
    series: [{
      name: 'Price',
      type: 'spline',

      data: priceData,
      tooltip: {
        valueDecimals: 2
      },
    }]
    };
    return (
      <div>
          <ReactHighcharts config = {configPrice}></ReactHighcharts>
      </div>
    )
  }
}
