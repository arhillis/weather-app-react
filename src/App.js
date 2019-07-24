import React from 'react';
import './App.css';

//87ee9d9eb500edc3fa8b18f1e1c97509

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      location: {
        city: "",
        state: "",
        zipCode: 75069
      },
      openWeather_API_KEY: "87ee9d9eb500edc3fa8b18f1e1c97509"

    }
  }

  getLocation = () => {
    const {location: {zipCode}, openWeather_API_KEY} = this.state;
    
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
            state: data.results[0].locations[0].adminArea3
          }
        })
      )
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
