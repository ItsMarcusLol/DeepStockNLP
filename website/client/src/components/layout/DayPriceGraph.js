import { ThemeProvider } from '@material-ui/styles';
import React, { PureComponent } from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  Line, LineChart, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
// import Title from './Title';
// import { Line } from 'react-chartjs-2';
import { render } from 'react-dom';

// let lineData;

// lineData = {
//   labels: ['6:30', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00',],
//   dataets: [
//     {
//       label: 'Google',
//       fill: false,
//       backgroundColor: 'green',
//       borderColor: 'green',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffSet: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'green',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [1232, 1425, 6432, 7543, 6422, 6432, 1241, 6432]
//     }
//   ]
// };

// const lineDataApple = {
//   labels: ['6:30', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00',],
//   dataets: [
//     {
//       label: 'Google',
//       fill: false,
//       backgroundColor: 'green',
//       borderColor: 'green',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffSet: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'green',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [1232, 1425, 6432, 7543, 6422, 6432, 1241, 6432]
//     }
//   ]
// };

// class DayPriceGraph extends Component {

//   constructor(props) {
//     super(props);
//     this.changeMetric = this.changeMetric.bind(this);

//     this.state = {
//       selectedMetric: 'Spend'
//     };
//   }

//   changeMetric(event) {
//     this.setState({
//       selectedMetric: event.target.value
//     });

//     switch (event.target.value) {
//       case 'Google':
//         lineData = lineData;
//         break;
//       case 'Apple':
//         lineData = lineDataApple;
//         break;
//       default:
//     }
//   }

//   render() {
//     const lineOptions = {
//       title: {
//         display: true,
//         text: 'Stocks'
//       },
//       tooltips: {
//         enabled: true,
//         callbacks: {
//           label: function(value, data) {
//             console.log('data', data)
//             const currentLabel = data.datasets[value.datasetIndex].label;
//             return currentLabel + ': ' + '$' + value.yLabel;
//           }
//         }
//       },
//       legend: {
//         display: true
//       },
//       maintainAspectRadio: true,
//       scales: {
//         yAxes: [{
//           ticks: {
//             callback: function(value) {
//               return '$' + parseFloat(value.toFixed(2));
//             }
//           },
//           stacked:false,
//           gridLines: {
//             display: true,
//             color: "rgba(255,99,132,0.2"
//           }
//         }],
//         xAxes: [{
//           gridlines: {
//             display:false
//           }
//         }]
//       }
//     };

//     return (
//       <div>
//         <select onChange={this.changeMetric} value={this.state.selectedMetric}>
//           <option value="Google">Google</option>
//           <option value="Apple">Apple</option>
//         </select>
//         <div className="row">
//           <div className="col-xl-10">
//             <div className="card">
//               <div className="card-header">
//                 <i className="fa fa-align-justify" />
//               </div>
//               <div className="card-block">
//                 <Line data={lineData} options={lineOptions} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// render(<DayPriceGraph />, document.body);

// export{DayPriceGraph};

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
      <h1> {this.props.symb} :</h1>
      <LineChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="Volume" stroke="#82ca9d" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="Low" stroke="red" />
        <Line type="monotone" dataKey="Volume" stroke="#8884d8" /> */}
      </LineChart>
      </div> 
    );
  }
}

//   render() {
//     return (
//       <div>
//         <LineChart data={this.state.lineChartData} />
//         <button onClick={this.change0}> Google </button>
//       </div>
//     )
//   }
// }


// import React,{Component} from 'react';
// //Make sure not to forget toimport Bar from the package (This is important it won't work without this step)
// import {Bar} from 'react-chartjs-2';

// class BarChart extends Component
// {
//   constructor() {
//     super();
//     this.state = {
//       barChartData: []
//     }

//     this.change0 = this.change0.bind(this);
//     this.change1 = this.change1.bind(this);
//     this.change2 = this.change2.bind(this);
//     // this.change3 = this.change3.bind(this);
//     // this.change4 = this.change4.bind(this);
//     // this.change5 = this.change5.bind(this);
//     // this.change6 = this.change6.bind(this);
//     // this.change7 = this.change7.bind(this);
//     // this.change8 = this.change8.bind(this);
//   }

//   componentDidMount() {
//     this.change0();
//     }

  // change0(){
  //   this.setState({
  //     barChartData:{
  //       labels: ['January', 'February', 'March',],
  //       datasets: [
  //         {
  //           label: '3 Months',
  //           backgroundColor: 'rgba(255,99,132,0.2)',
  //           borderColor: 'rgba(255,99,132,1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  //           hoverBorderColor: 'rgba(255,99,132,1)',
  //           data: [65, 59, 80]
  //         }
  //       ]
  //     }
  //   })
  // }

//   //OUR TWO NEW METHODS FOR  UPDATING THE STATE barChartData BASED ON EVENTS ON CLICK 
  // change1(){
  //   this.setState({
  //     barChartData:{
  //       labels: ['January', 'February', 'March','April','May','June'],
  //       datasets: [
  //         {
  //           label: '6 Months',
  //           backgroundColor: 'rgba(255,99,132,0.2)',
  //           borderColor: 'rgba(255,99,132,1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  //           hoverBorderColor: 'rgba(255,99,132,1)',
  //           data: [49, 22, 23,65,43,21]
  //         }
  //       ]
  //     }
  //   })
  // }

//   change2(){
//     this.setState({
//       barChartData:{
//         labels: ['January', 'February', 'March','April','May','June', 'July', 'Aug', 'Sept','Oct', 'Nov', 'Dec'],
//         datasets: [
//           {
//             label: 'One Year',
//             backgroundColor: 'rgba(255,99,132,0.2)',
//             borderColor: 'rgba(255,99,132,1)',
//             borderWidth: 1,
//             hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//             hoverBorderColor: 'rgba(255,99,132,1)',
//             data: [49, 22, 23,65,43,21,56,57, 100,23,43,21,]
//           }
//         ]
//       }
//     })
//   }

//   render() {
//     return (
//         <div>
//           <Bar data={this.state.barChartData}  />
//           //OUR ON CLICK EVENTS ARE DEFINED HERE - ALLOWING THE USER TO SWITCH BETWEEN VIEWS AND UPDATE THE STATE OF BarChartData on the fly
//           <button onClick={this.change0}>Change to 3 months</button>
//           <button onClick={this.change1}>Change to 6 months</button>
//           <button onClick={this.change2}>Change to 1 year</button>
//           {/*<button onClick={this.change2}></button>*/}
//         </div>
//   )
//   }
// }

// export default (BarChart) ;

// constructor() {
//   super();
//   this.state = {
//     lineChartData: []
//   }

//   this.change0 = this.change0.bind(this);
//   this.change1 = this.change1.bind(this);
//   // this.change2 = this.change2.bind(this);
//   // this.change3 = this.change3.bind(this);
//   // this.change4 = this.change4.bind(this);
//   // this.change5 = this.change5.bind(this);
//   // this.change6 = this.change6.bind(this);
//   // this.change7 = this.change7.bind(this);
//   // this.change8 = this.change8.bind(this);
// }

// componentDidMount() {
//   this.change0();
// }

// change0(){
//   this.setState({
//     lineChartData:{
//       labels: ['6:30', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00',],
//       datasets: [
//         {
//           label: 'Google',
//           backgroundColor: 'rgba(255,99,132,0.2)',
//           borderColor: 'rgba(255,99,132,1)',
//           borderWidth: 1,
//           hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//           hoverBorderColor: 'rgba(255,99,132,1)',
//           data: [1232, 1425, 6432, 7543, 6422, 6432, 1241, 6432]
//         }
//       ]
//     }
//   })
// }

// change1(){
//   this.setState({
//     lineChartData:{
//       labels: ['6:30', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00',],
//       datasets: [
//         {
//           label: 'Apple',
//           backgroundColor: 'rgba(255,99,132,0.2)',
//           borderColor: 'rgba(255,99,132,1)',
//           borderWidth: 1,
//           hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//           hoverBorderColor: 'rgba(255,99,132,1)',
//           data: [1232, 1425, 6432, 7543, 6422, 6432, 1241, 6432]
//         }
//       ]
//     }
//   })
// }