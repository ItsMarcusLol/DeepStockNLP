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
import { Link } from 'react-router-dom';

export default class HeadlineTable extends React.Component {
  state = {
      loading: true, 
      headlines: null,
      symbol: null
  };

  async componentDidMount() {
    
      const symbol = this.props.symb;
      // fetch('http://104.196.230.228:6023/homepage/headlines?symbol='+symbol, {method: "GET"})
      fetch('http://35.247.73.118:6023/homepage/headlines?symbol='+symbol, {method: "GET"})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Error: " + response.status);
            } else { 
              return response.json();
            }
          })
          .then( (obj) => {
            this.setState({loading: false, headlines: obj, symbol: symbol});
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
                fontSize: 33,
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
            }}>
                Headlines
            </div>
      }
      columns={[
        { title: 'Title', field: 'title' },
        { title: 'Date', field: 'publishedDate'},
        { title: 'Link', field: 'url', render: rowData => <Link style={{ color: 'blue', textDecoration: 'inherit'}} target= {"_blank"} to={{ pathname: rowData.url }}>{rowData.url}</Link> }
      ]}
      
      
      data = {this.state.headlines}
      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}