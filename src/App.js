import React, { Component } from 'react';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './redux/reducers/index';

const store = createStore(rootReducer);
console.log(store.getState());

export default class App extends Component {
  render() {
    return (
      <div>App</div>
    );
  }
}
