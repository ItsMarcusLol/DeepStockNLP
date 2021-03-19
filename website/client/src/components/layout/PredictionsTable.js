import React from 'react';
import MaterialTable, { MTableToolbar } from "material-table";
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
import Typography from "@material-ui/core/Typography";

const MyNewTitle = ({ text, variant }) => (
    <Typography
      variant={variant}
      style={{
        whiteSpace: "break-spaces",
        // overflow: "hidden",
        // textOverflow: "ellipsis"
      }}
    >
      {text}
    </Typography>
  );

export default class PredictionsTable extends React.Component {
  state = {
      loading: true, 
      predictions: null,
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
      console.log(data)
      this.setState({ prices:data, symbol:symbol, loading: false});
  }
  
 

  render() {
      if (this.state.loading){
         return <LoadingSymbol />
      }

      // if (!this.state.prices){
      //     return <div>Can't get table, right now. Check in later!</div>
      // }
      

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

        // title={<MyNewTitle variant="h4" text="Predictions" />}
        // components={{
        //   Toolbar: (props) => (
        //     <div
        //       style={{
        //         alignItems: "center",
        //         justifyContent: "center",
        //         display: "flex"
        //       }}
        //     >
        //       <MTableToolbar {...props} />
        //     </div>
        //   )
        // }}

      columns={[
        { title: 'Date', field: 'date' },
        { title: 'Open', field: 'open', type: 'numeric' },
        { title: 'High', field: 'high', type: 'numeric' },
        { title: 'Low', field: 'low', type: 'numeric' },
        { title: 'Close', field: 'close', type: 'numeric' },
        { title: 'Volume', field: 'volume', type: 'numeric'}
        
      ]}
      
      // data = {this.state.prices}
      // fake data
      data={[
        { date: '3-24-2021', open: '1234', close: '2313', high: '9393', low: '102', volume: '300' },
        { date: '3-23-2021', open: '1234', close: '2313', high: '5840', low: '302', volume: '300' },
        { date: '3-22-2021', open: '1234', close: '2313', high: '5943', low: '583', volume: '300' },
        { date: '3-21-2021', open: '1234', close: '2313', high: '8382', low: '452', volume: '300' },
        { date: '3-20-2021', open: '1234', close: '2313', high: '2048', low: '852', volume: '300' },
       
      ]}
      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}