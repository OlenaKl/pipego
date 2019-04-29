import React, { Component } from 'react';

import { Header, ContactsList } from './components';

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
