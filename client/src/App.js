import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Socios from './components/Socios'
import Profile from './components/Profile'
import CreateUser from './components/CreateUser'



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/socios" component={Socios} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/create_user" component={CreateUser} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
