import React from 'react';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
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
import HistoricalTable from './HistoricalTable';
import LoadingSymbol from './LoadingSymbol';



export default class PriceTable extends React.Component {
  state = {
      loading: true, 
      prices: null,
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
  

  render() {
      if (this.state.loading){
          // return <div>loading...</div>
          return <LoadingSymbol />
      }

      if (!this.state.prices){
          return <div>Can't get table, right now. Check in later!</div>
      }
      
      return (
       
       <div style={{"font-size" : "12px", "height" : "90px", "width" : "100%", "left":"left"}}>
        
        <MaterialTable style={{ width: '100%' }}
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
      options={{ search: true, doubleHorizontalScroll: true, paging: false, exportButton: false}}
      detailPanel={[
        {
          tooltip: 'Prediction',
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
                
                 {"Predictions Coming Soon"}
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
              
              <HistoricalTable symb ={rowData.symbol} />
            
                
               </div>

            )
          },
        },
        {
          icon: ViewColumn,
          openIcon: Remove,
          tooltip: 'Headlines',
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
                {rowData.name} {"Headlines Coming Soon"}
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
