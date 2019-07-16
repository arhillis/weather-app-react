import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      location: {
        city: "",
        state: "",
        zipCode: 75559
      },
    }
  }

  componentDidMount(){
    fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=%20%0902mtZLqgGoe78g58B17BcOC6BbddBEwh%20&q=${this.state.location.zipCode}&language=en-us&details=true`)
    .then(res => res.json())
    .then(data => {
      const {EnglishName, AdministrativeArea} = data[0];
      this.setState({
        location: {
          city: EnglishName,
          state: AdministrativeArea.ID
        }
      })

      console.log(data[0].ParentCity.Key)
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.location.city}, {this.state.location.state}
          </p>
          

          <form>

            <input type="text" />
            <p>Please enter a valid zip code.</p>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
