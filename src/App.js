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
        zipCode: 75409
      },
      API_KEY: "%20%0902mtZLqgGoe78g58B17BcOC6BbddBEwh"

    }
  }

  // getForcast = key =>{
  //   fetch(`https://samples.openweathermap.org/data/2.5/weather?zip=75559,us&appid=87ee9d9eb500edc3fa8b18f1e1c97509`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     // const forcast = data.DailyForecasts[0]

  //     // this.setState({
  //     //   phrase: forcast.Day.LongPhrase
  //     // })
  //   })
  // }

  getLocation = () => {
    const {location: {zipCode}} = this.state;
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=87ee9d9eb500edc3fa8b18f1e1c97509&units=imperial`)
    .then(res => res.json())
    .then(data => {
      const {name:city} = data;

      fetch('http://open.mapquestapi.com/geocoding/v1/address?key=oz9OL7hgFsSS19Ljsn3iL4PNMxGRT90E&location=33.34,-96.56')
      .then(res => res.json())
      .then(data => 
        this.setState({
          location: {
            city: city,
            state: data.results[0].locations[0].adminArea3
          }
        })
      )
      //   const {EnglishName, AdministrativeArea, ParentCity} = data[0];
    //   this.setState({
    //     location: {
    //       city: EnglishName,
    //       state: AdministrativeArea.ID
    //     }
    //   })      
    //   this.getForcast(ParentCity.Key)
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
