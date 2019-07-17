import React from 'react';
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
    const API_KEY = "%20%0902mtZLqgGoe78g58B17BcOC6BbddBEwh";
    const {zipCode} = this.state.location;
    
    fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${API_KEY}%20&q=${zipCode}&language=en-us&details=true`)
    .then(res => res.json())
    .then(data => {
      const {EnglishName, AdministrativeArea, ParentCity} = data[0];
      this.setState({
        location: {
          city: EnglishName,
          state: AdministrativeArea.ID
        }
      })

      fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${ParentCity.Key}?apikey=${API_KEY}%20&language=en-us&details=true&metric=false`).then(res => res.json())
      .then(data => console.log(data.DailyForecasts))
    })

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Weather App
        </header>
        <main className="container">
          <p>
            {this.state.location.city}, {this.state.location.state}
          </p>
          

          <form>

            <input type="text" />
            <p>Please enter a valid zip code.</p>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
