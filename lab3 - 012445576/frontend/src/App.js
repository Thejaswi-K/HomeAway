import React, { Component } from 'react';
import Main from './components/Main';
import {Router} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import {history} from './history';

class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <Provider store={store}>
        <Router history={history}>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
