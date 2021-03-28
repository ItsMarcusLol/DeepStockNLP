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

// export default class HTable extends React.Component {
function HT(props) {
  const symbol = props.symb
 
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
      title={symbol}
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}        
      options={{
        search: true
      }}
    />
  )
}

export default HT;