import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  componentDidMount(){
    fetch('http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=%20%0902mtZLqgGoe78g58B17BcOC6BbddBEwh%20&q=90210&language=en-us&details=true')
    .then(res => res.json())
    .then(data => console.log(data))
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
