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
import HeadlineTable from './HeadlineTable';
import PredictionsTable from './PredictionsTable';
// import DayPriceGraph from './DayPriceGraph';
import HistoricalGraph from './HistoricalGraph';
import Title from './Title';

export default class PriceTable extends React.Component {
  state = {
      loading: true, 
      prices: null,
  };

  async componentDidMount() {
    
      //const key = "f0448bd30a7028e245052fcf3caa0837";
     const key = "Insert Key Here";
      const stocks = ["BA", "WMT",  "AMZN", "TSLA", "MSFT", "F", "DELL", "TGT" ];
    
      var url = "https://financialmodelingprep.com/api/v3/quote-short/GOOGL?apikey=" + key;
      var response = await fetch(url);
      var data = await response.json();
      console.log(typeof(data))

      if (typeof(data) != JSON ){
          data = null
      }

      else{
      
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
      }

    console.log(data)
      this.setState({ prices:data, loading: false});
  }
  
     

  render() {
      if (this.state.loading){
          return <LoadingSymbol />
      }

      // if (!this.state.prices){
      //     return <div>Can't get table, right now. Check in later!</div>
          
      // }
      
      return (
       
      //  <div style={{"font-size" : "12px", "height" : "90px", "width" : "100%"}}>
      // <div>
       <div style={{fontSize: "12px", height : "90px", width : "100%", left:"left"}}> 
        
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
            { title: 'Company', field: 'companyName'},
            { title: 'Price', field: 'price' },
            { title: 'Volume', field: 'volume', type: 'numeric' },
          ]}
      
        // data = {this.state.prices}
        data={[
          { symbol: 'GOOGL', companyName: 'Google', price: '1234', volume: '2313' },
          { symbol: 'APPL', companyName: 'Apple', price: '5678', volume: '1957' },
          { symbol: 'BA', companyName: 'Boeing', price: '1231', volume: '19217' },
          { symbol: 'WMT', companyName: 'Walmart', price: '1111', volume: '198347'},
          { symbol: 'AMZN', companyName: 'Amazon', price: '2222', volume: '3287'},
          { symbol: 'TSLA', companyName: 'Tesla', price: '3434', volume: '4537' },
          { symbol: 'MSFT', companyName: 'Microsoft', price: '5432', volume: '1212' },
          { symbol: 'F', companyName: 'Ford', price: '2314', volume: '2321' },
          { symbol: 'DELL', companyName: 'Dell', price: '4521', volume: '2321'},
          { symbol: 'TGT', companyName: 'Target', price: '1232', volume: '7391'},
        ]}
        options={{ search: true, doubleHorizontalScroll: true, paging: true, exportButton: false, pageSize:10}}
        detailPanel={[
          {
            tooltip: 'Prediction',
            render: rowData => {
              return (
                <div
                  // style={{
                  //   fontSize: 14,
                  //   textAlign: 'center',
                  //   color: 'white',
                  //   backgroundColor: '#43A047',
                  // }}
                >

                  {/* <Title>Our Predictions</Title> */}

                  <PredictionsTable />
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
                
                <Title>Historical Prices</Title>
                  
                <HistoricalGraph />

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
                      // style={{
                      //   fontSize: 100,
                      //   textAlign: 'center',
                      //   color: 'white',
                      //   backgroundColor: '#FDD835',
                      // }}
                    >
                      {/* <Title>Headlines</Title> */}

                      <HeadlineTable />
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
