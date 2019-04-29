import React, { Component } from 'react';

import { Header, ContactsList, Footer } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ContactsList />
        <Footer />
      </div>
    );
  }
}

export default App;
