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
              
              this.setState({loading: false, headlines: response.json(), symbol: symbol});
              return response.text();
            }
          })
          .then( (text) => {
            console.log(text);
          });
  }
  
 

  render() {
      if (this.state.loading){
         return <LoadingSymbol />
      }

      var headlinesData = JSON.parse(this.state.headlines);

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
      
      /** fake data 
      data={[
        { title: 'Google is Splitting?', author: 'Jane Doe', date: '3-17-2021', link: <a href="http://google.com/" target="_blank" rel="noreferrer" style={{color:'blue'}}>http://google.com/</a> },
        { title: 'Worker says Amazon hung anti-union signs in bathroom stalls', author: 'Joseph Pisani', date: '3-17-2021', link: <a href="https://www.marketbeat.com/articles/worker-says-amazon-hung-anti-union-signs-in-bathroom-stalls-2021-03-17/?1" target="_blank" rel="noreferrer" style={{color:'blue'}}>https://www.marketbeat.com/</a> },
        { title: 'Forget Tesla, Ford Motor May be the Best Auto Play', author: 'Marketbeat Staff', date: '3-16-2021', link: <a href="https://www.marketbeat.com/originals/forgot-tesla-ford-motor-may-be-the-best-auto-play/" target="_blank" rel="noreferrer" style={{color:'blue'}}>https://www.marketbeat.com/</a> },
        { title: 'How Tesla Is Taking Over', author: 'Bob Ross', date: '3-15-2021', link: <a href="http://tesla.com/" target="_blank" rel="noreferrer" style={{color:'blue'}}>http://tesla.com/</a>},
        { title: 'Will Target Take Over Walmart?', author: 'Alice Tran', date: '3-15-2021', link: <a href="http://target.com/" target="_blank" rel="noreferrer" style={{color:'blue'}}>http://target.com/</a> }

      ]}*/

      options={{ search: false, paging: true, pageSize: 5, exportButton: false, doubleHorizontalScroll: true, filtering: false , sorting: false}}
    
    />
      );
  }

}