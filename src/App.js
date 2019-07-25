import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      zipCode: 75559,
      zipCodeValid: false,
      location: {
        city: "",
        state: "",
        zip: ''
      },
      forcast: {
        phrase: "",
        icon: "",
        currentTemp: "",
        high: "", 
        low: ""
      },
      openWeather_API_KEY: "87ee9d9eb500edc3fa8b18f1e1c97509",
      mapquest_API_KEY: "oz9OL7hgFsSS19Ljsn3iL4PNMxGRT90E"

    }
  }

  getLocation = () => {
    const {zipCode, openWeather_API_KEY, mapquest_API_KEY} = this.state;
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${openWeather_API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      const {name:city, coord: {lat, lon}, main:{temp, temp_max, temp_min}, weather} = data;
      const {description, icon} = weather[0];

      fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${mapquest_API_KEY}&location=${lat},${lon}`)
      .then(res => res.json())
      .then(data => 
        this.setState({
          location: {
            city: city,
            state: data.results[0].locations[0].adminArea3,
            zip: zipCode
          },
          forcast: {
            phrase: description,
            icon: icon,
            currentTemp: temp,
            high: temp_max,
            low: temp_min
          }
        })
      )
    })
  }

  onChange = event => {
    const zipRegex = /^\d{5}$/
    const {value} = event.target
    this.setState({
      zipCode: value,
      zipCodeValid: zipRegex.test(value)
    })
  }

  onSubmit = (event) =>{
    event.preventDefault();
    if(this.state.zipCodeValid){
      this.getLocation()
    }else{
      alert("Please enter a valid zip code.")
    }
  }

  componentDidMount(){
    this.getLocation();
  }

  render(){
    const {location: {city, state, zip}, forcast: {phrase, currentTemp, high, low}} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          Weather App
        </header>
        <main className="container">
          <h3>
            Forcast for {city}, {state} {zip}
          </h3>
          <p>{phrase}</p>
          <p>Current tempeture: {currentTemp}</p>
          <p>High: {high}</p>
          <p>Low: {low}</p>

          <form onSubmit={this.onSubmit}>
            <label>
              <input type="text" 
                    name="zipCode" 
                    value = {this.state.zipCode}
                    onChange={this.onChange}
              />
            </label>            
            <p>Please enter a valid zip code.</p>
            <input type="submit" value="Get Data" />
          </form>
        </main>
      </div>
    );
  }
}

export default App;
