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

/**
 * Gets our predictions from the database and puts it into a table
 * that contains the features ticker, date, prediction, and
 * accuracy.
 */
export default class PredictionsTable extends React.Component {
  state = {
      loading: true, 
      predictions: null,
      symbol: null
  };

  async componentDidMount() {
    const symbol = this.props.symb;
    fetch ('http://35.247.73.118:6023/predictions?symbol='+symbol, {method: "GET"})
        .then( (response) => {
          if ( response.status !== 200) {
            console.log("Error: " + response.status);
          } else {
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

      columns={[
        { title: 'Ticker', field: 'ticker' },
        { title: 'Date', field: 'date'},
        { title: 'Prediction - 1 will go up, 0 will go down', field: 'prediction' },
        { title: 'Accuracy Of Prediction', field: 'acc' }
      ]}
      
      data={this.state.predictions}
  
      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}