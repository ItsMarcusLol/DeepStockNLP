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
      fetch('http://104.196.230.228:80/homepage/headlines?symbol='+symbol, {method: "GET"})
          .then( (response) => {
            if ( response.status !== 200) {
              console.log("Error: " + response.status);
            } else {
              console.log(response.status);
              
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

      var headlinesData = this.state.headlines;

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
        { title: 'Date', field: 'date'},
        { title: 'Link', field: 'link' }
      ]}
      
      data={[
        { title: headlinesData[0].title, date: headlinesData[0].publishedDate, link: headlinesData[0].url},
        { title: headlinesData[1].title, date: headlinesData[1].publishedDate, link: headlinesData[1].url},
        { title: headlinesData[2].title, date: headlinesData[2].publishedDate, link: headlinesData[2].url},
        { title: headlinesData[3].title, date: headlinesData[3].publishedDate, link: headlinesData[3].url}
      ]}
      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}