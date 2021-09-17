import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();
class App extends Component {

  // Provider nos da la posiobilidad de tener un store, aca lo definimos a traves de ConfigureStore
  // Esto nos va a dar la posibilidad de usar 
  render() {
    return (
      <Provider store={ store}>
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;