import React, { Component } from 'react';

import Header from './components/Header';
import ContactsList from './components/ContactsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ContactsList />
      </div>
    );
  }
}

export default App;
