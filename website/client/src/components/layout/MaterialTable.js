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

export default class PriceTable extends React.Component {
  state = {
      loading: true, 
      prices: null,
  };

  async componentDidMount() {
  
      // fetch('http://104.196.230.228:6023/homepage/current', {method: "GET"})
      fetch ('http://35.247.73.118:6023/homepage/current', {method: "GET"})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Error: " + response.status);
            } else {
              console.log(response.status);
              
              return response.json();
            }
          })
          .then( (obj) => {
            this.setState({loading: false, prices: obj});
          });
  }
  
     

  render() {
      if (this.state.loading){
          return <LoadingSymbol />
      }

      var pricesData = this.state.prices;

      return (
       
       <div style={{fontSize: "12px", width : "100%", left:"left"}}> 
        
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
            { title: 'Symbol', field: 'symbol' },
            { title: 'Company', field: 'companyName'},
            { title: 'Price', field: 'price' },
            { title: 'Volume', field: 'volume', type: 'numeric' },
          ]}
      
        data = {[
          {symbol: pricesData[0].symbol, companyName: pricesData[0].name, price: pricesData[0].price, volume: pricesData[0].volume}, 
          {symbol: pricesData[1].symbol, companyName: pricesData[1].name, price: pricesData[1].price, volume: pricesData[1].volume}, 
          {symbol: pricesData[2].symbol, companyName: pricesData[2].name, price: pricesData[2].price, volume: pricesData[2].volume}, 
          {symbol: pricesData[3].symbol, companyName: pricesData[3].name, price: pricesData[3].price, volume: pricesData[3].volume}, 
          {symbol: pricesData[4].symbol, companyName: pricesData[4].name, price: pricesData[4].price, volume: pricesData[4].volume}, 
          {symbol: pricesData[5].symbol, companyName: pricesData[5].name, price: pricesData[5].price, volume: pricesData[5].volume}, 
          {symbol: pricesData[6].symbol, companyName: pricesData[6].name, price: pricesData[6].price, volume: pricesData[6].volume}, 
          {symbol: pricesData[7].symbol, companyName: pricesData[7].name, price: pricesData[7].price, volume: pricesData[7].volume}, 
          {symbol: pricesData[8].symbol, companyName: pricesData[8].name, price: pricesData[8].price, volume: pricesData[8].volume}, 
          {symbol: pricesData[9].symbol, companyName: pricesData[9].name, price: pricesData[9].price, volume: pricesData[9].volume} 
        ]}
        options={{ search: true, doubleHorizontalScroll: true, paging: true, exportButton: false, pageSize:10}}
        detailPanel={[
          {
            tooltip: 'Prediction',
            render: rowData => {
              return (
                <div
                >


                  <PredictionsTable symb ={rowData.symbol} />
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
                    <div>
                      <HeadlineTable symb ={rowData.symbol} />
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
