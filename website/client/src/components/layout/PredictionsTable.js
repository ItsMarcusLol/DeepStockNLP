import React from 'react';
import MaterialTable from "material-table";
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import LoadingSymbol from './LoadingSymbol';

export default class PredictionsTable extends React.Component {
  state = {
      loading: false, 
      predictions: null,
      symbol: null
  };


  async componentDidMount() {
    const symbol = this.props.symb;
    // fetch('http://104.196.230.228:6023/predictions?symbol='+symbol, {method: "GET" })
    fetch ('http://35.247.73.118:6023/predictions?symbol='+symbol, {method: "GET"})
        .then( (response) => {
          if ( response.status !== 200) {
            console.log("Error: " + response.status);
          } else {
            console.log(response.status);
            
            return response.json();
          }
        })
        .then( (obj) => {
          this.setState({loading: false, predictions: obj});
        });
  }

 

  render() {
      if (this.state.loading){
         return <LoadingSymbol />
      }

      var predictionsData = this.state.predictions;

      if (this.state.predictions == null){
        return <div> Can't get predictions right now</div>
      }

      return (
       
        <MaterialTable
        icons={{
          Check: () => <Check />,
          Export: () => <SaveAlt />,
          SortArrow: () => <FilterListIcon />,
          FirstPage: () => <FirstPage />,
          LastPage: () => <LastPage />,
          NextPage: () => <ChevronRight />,
          PreviousPage: () => <ChevronLeft />,
          Search: () => <Search />,
          ThirdStateCheck: () => <Remove />,
          ViewColumn: () => <ViewColumn />,
          DetailPanel: () => <ChevronRight />,
          ResetSearch: () => <Clear />
        }}
        title= {
            <div 
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                fontSize: 33
              }}>
                  Our Predictions
              </div>
        }  

      // columns={[
      //   { title: 'Date', field: 'date' },
      //   { title: 'Time', field: 'time', type: 'numeric' },
      //   { title: 'Prediction ', field: 'prediction', type: 'numeric' },
      //   // { title: 'Low', field: 'low', type: 'numeric' },
      //   // { title: 'Close', field: 'close', type: 'numeric' },
      //   // { title: 'Volume', field: 'volume', type: 'numeric'}
        
      // ]}
      
      // data={[
      //   { date: '3-24-2021', time: '1234', prediction: '1', high: '9393', low: '102', volume: '300' },
      //   // { date: '3-23-2021', open: '1234', close: '2313', high: '5840', low: '302', volume: '300' },
      //   // { date: '3-22-2021', open: '1234', close: '2313', high: '5943', low: '583', volume: '300' },
      //   // { date: '3-21-2021', open: '1234', close: '2313', high: '8382', low: '452', volume: '300' },
      //   // { date: '3-20-2021', open: '1234', close: '2313', high: '2048', low: '852', volume: '300' },
       
      // ]}

      columns={[
        { title: 'Ticker', field: 'ticker' },
        { title: 'Date', field: 'date'},
        { title: 'Prediction', field: 'prediction' },
        { title: 'Confidence', field: 'con'},
        { title: 'Accuracy', field: 'acc' }
      ]}
      
      data={this.state.predictions}
      
      // data={[
      //   {ticker: predictionsData[0].ticker, date: predictionsData[0].date, prediction: predictionsData[0].prediction, con: predictionsData[0].con, acc: predictionsData[0].acc}
      // ]}

      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}