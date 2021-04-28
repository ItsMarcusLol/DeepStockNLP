import React, { Component } from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import PriceTicker from './components/layout/PriceTicker';
import MaterialTable from './components/layout/MaterialTable';
import Grid from '@material-ui/core/Grid';
import Chat from './components/layout/Chat';
import RadioB from './components/layout/RadioB';
import Search from './components/layout/Search';

class App extends Component {
 
  state = {
    username: '',
    password: '',
    userId: '',

    authenticated: false
  };

  login = (username, password) => {
    this.setState({ username: username, password: password, userId: 123, authenticated: true });
  }


  render() {
    
    // console.log(this.state);
    return (
      <div className="App">
      <Router >
      
          <div className="container" >
            {/* <div style={{padding: 0}}> */}
            {/* <div className={useStyles.root}> */}
              <Header />
              <Route exact path="/" render={props => (
                <React.Fragment>
                  <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <PriceTicker />
                  </Grid>

                  <Grid item xs={6}>
                    {/* <SearchTextBox /> */}
                    <Search />
                  </Grid>

                  <Grid item xs={6}>
                    <RadioB />
                  </Grid>

                  <Grid item xs={6}>
                    <MaterialTable /> 
                  </Grid>

                  {/* <Grid item xs={6}>
                      <ChatList />
                   </Grid> */}

                  <Grid item xs={6}>
                      <Chat />
                  </Grid>

                </Grid>

                </React.Fragment>
              )} />
              <Route path="/about" component={About} />
              <Route path="/login">
                <Login login={this.login}  accounts ={[
      { username: 'user123', password: 'password123', post: 'It gonna go up' },
      { username: 'Wolff', password: 'Wolffman', post: 'It gonna go doen' },
      { username: 'Blaha', password: 'fireplace', post: 'It gonna' },
      
    ]}/>
              </Route>
              <Route path="/signup">
                <SignUp login={this.login} />
              </Route>
              {/* </div> */}
          </div>
     
      </Router>
      </div>
    );
  }
}

export default App;
