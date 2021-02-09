import React from 'react';
import MaterialTable from "material-table";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
// import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import ResetSearch from '@material-ui/icons/ResetSearch';
// import { SvgIconProps } from '@material-ui/core/SvgIcon';
// import SortArrow from '@material-ui/icons/Sort';
// import HistoricalTable from './HistoricalTable';
import LoadingSymbol from './LoadingSymbol';




export default class HistoricalTable extends React.Component {
  state = {
      loading: true, 
      prices: null,
      symbol: null
  };

  async componentDidMount() {
    
      const symbol = this.props.symb;
      console.log(symbol);
      const key = "f0448bd30a7028e245052fcf3caa0837";
     
    
      var url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+symbol+"?timeseries=30&apikey=f0448bd30a7028e245052fcf3caa0837";
      var response = await fetch(url);
      var data = await response.json();
      // console.group(data)
      // console.log(data['historical'])
      // var symb = data['symbol']
     
      data = data['historical']

      console.log("here "+symbol);
      this.setState({ prices:data, symbol:symbol, loading: false});
  }
  
 

  render() {
      if (this.state.loading){
          // return <div>loading...</div>
         return <LoadingSymbol />
      }

      if (!this.state.prices){
          return <div>Can't get table, right now. Check in later!</div>
      }
      

      return (
       
      //  <div style={{"font-size" : "12px", "height" : "90px", "width" : "50%"}}>
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
      title="Historical Prices"
     
      columns={[
        // { title: 'Name', field: 'name' },
        // { title: 'Name', field:this.state.symbol },
        { title: 'Date', field: 'date' },
        { title: 'Open', field: 'open', type: 'numeric' },
        { title: 'High', field: 'high', type: 'numeric' },
        { title: 'Low', field: 'low', type: 'numeric' },
        { title: 'Close', field: 'close', type: 'numeric' },
        
      ]}
      
      data = {this.state.prices}
      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
    // {/* </div> */}
  
      );
  }

}
