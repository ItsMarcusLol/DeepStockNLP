import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import FetchStockPrices from './components/layout/FetchStockPrices';
import MaterialTable from './components/layout/MaterialTable';
import DayPriceGraph from './components/layout/DayPriceGraph';
import HTable from './components/layout/HTable';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';




class App extends Component {
  state = {
    username: '',
    password: '',
    userId: '',
    authenticated: false
  }


  login = (username, password) => {
    this.setState({ username: username, password: password, userId: 123, authenticated: true });
  }



  render() {
    console.log(this.state);
    return (
      <Router>
        <div className="App">
          <div className="container">
          {/* <Grid container spacing={2}>
          <Grid item xs={12}> */}
            {/* <Paper >xs=12</Paper> */}
            <Header />
          {/* </Grid> */}
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                   {/* <Paper >xs=12</Paper> */}
                   <FetchStockPrices />
                </Grid>
                <Grid item xs={3}>
                   {/* <Paper >xs=3</Paper> */}
                   <DayPriceGraph />
                </Grid>
                <Grid item xs={3.2}>
                   {/* <Paper >xs=3</Paper> */}
                   <DayPriceGraph />
                </Grid>
                
                <Grid item xs={6}>
                   {/* <Paper >xs=6</Paper> */}
                   <MaterialTable /> 
                </Grid>

                <Grid item xs={6}>
                   {/* <Paper >xs=6</Paper> */}
                   <HTable /> 
                </Grid>
               </Grid>
                
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
            <Route path="/login">
              <Login login={this.login} />
            </Route>
            <Route path="/signup">
              <SignUp login={this.login} />
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
