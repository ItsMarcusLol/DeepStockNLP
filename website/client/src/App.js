import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import FetchStockPrices from './components/layout/FetchStockPrices';
import MaterialTable from './components/layout/MaterialTable';

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
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <FetchStockPrices />
                <MaterialTable /> 
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
