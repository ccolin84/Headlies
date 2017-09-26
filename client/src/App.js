import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
