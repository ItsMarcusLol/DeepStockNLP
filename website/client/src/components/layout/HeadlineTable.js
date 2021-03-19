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

export default class HeadlineTable extends React.Component {
  state = {
      loading: true, 
      headlines: null,
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
      title="Headlines"
     
      columns={[
        { title: 'Title', field: 'title' },
        { title: 'Author', field: 'author'},
        { title: 'Date', field: 'date'},
        { title: 'Link', field: 'link' }
        // { title: 'Close', field: 'close', type: 'numeric' },
        // { title: 'Volume', field: 'volume', type: 'numeric'}
        
      ]}
      
      // data = {this.state.prices}
      // fake data
      data={[
        { title: 'Google is Splitting?', author: 'Jane Doe', date: '3-17-2021', link: <a href="http://google.com/" style={{color:'blue'}}>http://google.com/</a> },
        { title: 'Worker says Amazon hung anti-union signs in bathroom stalls', author: 'Joseph Pisani', date: '3-17-2021', link: <a href="https://www.marketbeat.com/articles/worker-says-amazon-hung-anti-union-signs-in-bathroom-stalls-2021-03-17/?1" style={{color:'blue'}}>https://www.marketbeat.com/</a> },
        { title: 'Forget Tesla, Ford Motor May be the Best Auto Play', author: 'Marketbeat Staff', date: '3-16-2021', link: <a href="https://www.marketbeat.com/originals/forgot-tesla-ford-motor-may-be-the-best-auto-play/" style={{color:'blue'}}>https://www.marketbeat.com/</a> },
        { title: 'How Tesla Is Taking Over', author: 'Bob Ross', date: '3-15-2021', link: <a href="http://tesla.com/" style={{color:'blue'}}>http://tesla.com/</a>},
        { title: 'Will Target Take Over Walmart?', author: 'Alice Tran', date: '3-15-2021', link: <a href="http://target.com/" style={{color:'blue'}}>http://target.com/</a> }
        
        
      ]}
      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}