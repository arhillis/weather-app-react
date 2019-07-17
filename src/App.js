import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      location: {
        city: "",
        state: "",
        zipCode: 75501
      },
      API_KEY: "%20%0902mtZLqgGoe78g58B17BcOC6BbddBEwh"

    }
  }

  getForcast = key =>{
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${this.state.API_KEY}%20&language=en-us&details=true&metric=false`)
    .then(res => res.json())
    .then(data => {
      const forcast = data.DailyForecasts[0]
      console.log(forcast);

      this.setState({
        phrase: forcast.Day.LongPhrase
      })
    })
  }

  getLocation = () => {
    const {API_KEY, location: {zipCode}} = this.state;
    
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
      this.getForcast(ParentCity.Key)
    })
  }

  componentDidMount(){
    this.getLocation();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Weather App
        </header>
        <main className="container">
          <p>{this.state.phrase}</p>
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
