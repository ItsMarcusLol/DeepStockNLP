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





export default class PriceTable extends React.Component {
  state = {
      loading: true, 
      prices: null,
      // tableIcons: null
  };

  async componentDidMount() {
    
      const key = "f0448bd30a7028e245052fcf3caa0837";
     
      const stocks = ["BA", "WMT",  "AMZN", "TSLA", "MSFT", "F", "DELL", "TGT" ];
    
      var url = "https://financialmodelingprep.com/api/v3/quote-short/GOOGL?apikey=f0448bd30a7028e245052fcf3caa0837";
      var response = await fetch(url);
      var data = await response.json();
      data = JSON.stringify(data)
      data = JSON.parse(data)
      
       
      var i = 0;
      for (i = 0; i < stocks.length; i++) {
        url = "https://financialmodelingprep.com/api/v3/quote-short/"+stocks[i]+"?apikey=" + key;
        response = await fetch(url);
        var data1 = await response.json();
        data1 = JSON.stringify(data1)
        var d1 = data1.substring(1,data1.length- 1);
        data.push(JSON.parse(d1))
      }
      this.setState({ prices:data, loading: false});
  }
  

  handleClick() {
    console.log('click');
  }

  render() {
      if (this.state.loading){
          return <div>loading...</div>
      }

      if (!this.state.prices){
          return <div>Can't get table, right now. Check in later!</div>
      }
      
      return (
       
       <div style={{"font-size" : "12px", "height" : "90px", "width" : "50%"}}>
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
      title="Our Stocks"
     
      columns={[
        // { title: 'Name', field: 'name' },
        { title: 'Symbol', field: 'symbol' },
        { title: 'Price', field: 'price' },
        { title: 'Volume', field: 'volume', type: 'numeric' },
        
      ]}
      
      data = {this.state.prices}
      options={{ search: true, paging: false, exportButton: false }}
      detailPanel={[
        {
          tooltip: 'Show Name',
          render: rowData => {
            return (
              <div
                style={{
                  fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#43A047',
                }}
              >
                {rowData.symbol}
              </div>
            )
          },
        },
        {
          icon: AddBox,
          tooltip: 'Historical Prices',
          render: rowData => {
            return (
              <div>
              
              {/* {<HistoricalTable />} */}
                
              </div>

                // <IconButton aria-label="User" onClick={(event, rowData)=>{
                //     setRows(rowData);
                //      setOpen(true);} }>
                // {<HistoricalTable />}
                // </IconButton>
            )
          },
        },
        {
          icon: ViewColumn,
          openIcon: Remove,
          tooltip: 'More',
          render: rowData => {
            return (
              <div
                style={{
                  fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#FDD835',
                }}
              >
                {rowData.name} {rowData.volume}
              </div>
            )
          },
        },
      ]}
    />
    </div>
  
      );
  }

}
