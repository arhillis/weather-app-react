import React from 'react';
import './App.css';

//87ee9d9eb500edc3fa8b18f1e1c97509

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
      openWeather_API_KEY: "87ee9d9eb500edc3fa8b18f1e1c97509"

    }
  }

  getLocation = () => {
    const {zipCode, openWeather_API_KEY} = this.state;
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${openWeather_API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      const {name:city, coord: {lat, lon}} = data;
      console.log(data)

      fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=oz9OL7hgFsSS19Ljsn3iL4PNMxGRT90E&location=${lat},${lon}`)
      .then(res => res.json())
      .then(data => 
        this.setState({
          location: {
            city: city,
            state: data.results[0].locations[0].adminArea3,
            zip: zipCode
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

  componentDidMount(){
    this.getLocation();
  }

  render(){
    const {zipCode} = this.state.location;
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
          

          <form >
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
