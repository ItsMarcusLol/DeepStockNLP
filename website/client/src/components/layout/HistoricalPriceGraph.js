import React, { PureComponent } from 'react';
import {
  Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

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
        <XAxis dataKey="date" stroke="#FFF"/>
        <YAxis stroke="#FFF"/> 
        
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        
        {/* <Tooltip wrapperStyle={{ backgroundColor: "white" }} labelStyle={{ color: "green" }}
             itemStyle={{ color: "cyan" }}content={<CustomTooltip/>} />  */}

        <Tooltip content={<CustomTooltip/>} />

        {/* <Tooltip
            wrapperStyle={{ backgroundColor: "red" }}
            labelStyle={{ color: "green" }}
            itemStyle={{ color: "cyan" }}
            formatter={function(value, name) {
              console.log(name)
              return `${value}, ${name}`;
            }}
            labelFormatter={function(value) {
              return `label: ${value}`;
            }}
          /> */}
        
        <Line type="monotone" strokeWidth="3" dataKey="change" stroke="#82ca9d" activeDot={{ r: 8 }} />
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
