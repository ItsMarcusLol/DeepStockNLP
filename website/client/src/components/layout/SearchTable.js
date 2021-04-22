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

export default class SearchTable extends React.Component {
  

  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      loading: true, 
      output: null,
      symbol: null,
  
    };
    {console.log(this.props.data)}
    const input = this.props.symb
    const data = this.props.data
    this.setState({ symbol: input, output:data});
  }

  

  async componentDidMount() {
    // console.log("here")
    // const input = this.props.symb
    // const data = this.props.data
    // this.setState({ loading: false, symbol: input, output:data});
  //   async shouldComponentUpdate(){
  //   console.log("here")
    const input = this.props.symb
    const key = "f0448bd30a7028e245052fcf3caa0837"
    // const key = 1;
    // var input = this.props.input;
    const url = "https://financialmodelingprep.com/api/v3/search?query="+ input +"&limit=15&exchange=NASDAQ&apikey="+key;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    
  //   // this.setState({ prices: data, loading: false});
  await this.setState({ symbol: input, output:data});
  {console.log(this.state.output)}
  this.setState({loading: false, })

}
  
 

  render() {
    console.log(this.state.loading)
      if (this.state.loading){
         return <LoadingSymbol />
      }

      if (!this.state.output){
          return <div>Can't get table, right now. Check in later!</div>
      }
      {console.log(this.props.output)}

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
              {this.state.symbol}
          </div>
    }  
     
     
      columns={[
        { title: 'Currency', field: 'currency' },
        { title: 'Short Name', field: 'exchangeShortName' },
        { title: 'Name', field: 'name' },
        { title: 'Name', field: 'stockExchange' },
        { title: 'Name', field: 'symbol' },
        // { title: 'Open', field: 'open', type: 'numeric' },
        // { title: 'High', field: 'high', type: 'numeric' },
        // { title: 'Low', field: 'low', type: 'numeric' },
        // { title: 'Close', field: 'close', type: 'numeric' },
        // { title: 'Volume', field: 'volume', type: 'numeric'}
        
      ]}
      
      
       data = {this.state.output}
      // fake data
      // data={[
      //   { currency: '2-12-2021', open: '1234', close: '2313', high: '100', low: '0', volume: '300' },
      //   // { date: '2-12-2021', open: '1234', close: '2313', high: '100', low: '0', volume: '300' },
      //   // { date: '2-11-2021', open: '1234', close: '2313', high: '100', low: '0', volume: '300' },
      //   // { date: '2-10-2021', open: '1234', close: '2313', high: '100', low: '0', volume: '300' },
      //   // { date: '2-9-2021', open: '1234', close: '2313', high: '100', low: '0', volume: '300' },
      //   // { date: '2-8-2021', open: '1234', close: '2313', high: '100', low: '0', volume: '300' },
       
      // ]}
      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}