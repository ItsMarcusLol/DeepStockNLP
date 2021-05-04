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
  cols1=[
    { title: 'Currency', field: 'currency' },
    { title: 'Short Name', field: 'exchangeShortName' },
    { title: 'Name', field: 'name' },
    { title: 'Name', field: 'stockExchange' },
    { title: 'Name', field: 'symbol' }, 
    { title: 'Price', field: 'price' }, 
  ]

    constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      loading: true, 
      output: null,
      symbol: null,
      columns: null, 
      header: null, 
      title: null
  
    };
    const input = this.props.symb
    const data = this.props.data
    this.setState({ symbol: input, output:data});
  }


  async componentDidMount() {
    const input = this.props.symb 
    const key = "f0448bd30a7028e245052fcf3caa0837"
    var url = "https://financialmodelingprep.com/api/v3/search?query="+ input +"&limit=15&exchange=NASDAQ,NYSE&apikey="+key;
    var response = await fetch(url);
    var data = await response.json();
    
    if(data.length > 0){
    var t = data[0]['name'];
    var cols=[
      { title: 'Currency', field: 'currency' },
      { title: 'Short Name', field: 'exchangeShortName' },
      { title: 'Name', field: 'name' },
      { title: 'Exchange', field: 'stockExchange' },
      { title: 'Symbol', field: 'symbol' },  
    ]
    
  }
  
    
    if (data.length === 1){
      console.log("in if")
      const sym = data[0].symbol;
      const url2 = "https://financialmodelingprep.com/api/v4/company-outlook?symbol="+sym+"&apikey="+key;
      const response2 = await fetch(url2);
      const d = await response2.json();
      data = d['stockNews'];
      var d1 = d['profile'];

      var h =  <div >Price : {d1['price']} <br/>
      Volume Avg : {d1['volAvg']} <br/>
      Website : {d1['website']} <br/>
      </div>;
      
      cols=[
        { title: 'Date', field: 'publishedDate' },
        { title: 'Website', field: 'site' },
        { title: 'Title', field: 'title' }, 
        { title: 'URL', field: 'url' }, 
      ]
      
    }
    else{
      t = "Were you searching for one of these: ";
    }
    if (data.length === 0){
   
        t = "Could not find your stock, make sure the stock is a part of NYSE or NASDAQ"
    }
    
    
   await this.setState({ symbol: input, output:data, header: h, columns:cols, title : t});
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
        <div>
          
        {this.state.header}

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
            fontSize: 24 
          }}>
               {this.state.title}
          </div>
    }  
     
      columns={this.state.columns}
      data = {this.state.output}
      options={{ search: false, paging: true, pageSizeOptions: [1,2] , pageSize: 2, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
    </div>
      );
  }

}