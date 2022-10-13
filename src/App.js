import React, { useState } from 'react';
import './App.scss';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Search from './components/search/search';
import CurrentWeather from './components/current-weather';
import CurrentForecast from './components/current-forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);
  const [modalShown, toggleModal] = useState(false);
  const [unit, setUnit] = useState('imperial');

   const changeUnit = (val) => {
    setUnit(val);
   };

  const showModal = () => toggleModal(true);
  const hideModal = () => toggleModal(false);

  const handleSearchChange = async (searchData) =>{
      //searchData = {label: 'label'}
      if(modalShown) hideModal();
      const [latitude, longitude] = searchData.value.split(' ');
      const weather = await fetch(`${WEATHER_API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=${unit}`);
      const weatherFormatted = await weather.json();

      const forecast = await fetch(`${WEATHER_API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=${unit}`);
      const forecastFormatted = await forecast.json(); 
      setCurrentWeather({currentCity: searchData.label, ...weatherFormatted});
      setCurrentForecast({currentCity: 'City goes here...', ...forecastFormatted});
  }

  const getCurrentLocation = () =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleSearchChange);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
  }

  // function showPosition(position) {
  //   //const {latitude, longitude} = position.coords;
  //   const mapquest_API_KEY = "oz9OL7hgFsSS19Ljsn3iL4PNMxGRT90E";
  //   //http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=
  //   fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${mapquest_API_KEY}&location=De+Kalb`)
  //     .then(res => res.json())
  //     .then(data => console.log(data.results[0].locations))//.results[0]
  //     .catch(err => console.log(err))

  // }
  return (<Container className="App">
            <Modal show={modalShown} onHide={hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ToggleButtonGroup type="radio" name='temp-unit' value={unit} size='sm' onChange={changeUnit}>
                  <ToggleButton id="imperial" value='imperial'>
                    &deg;F
                  </ToggleButton>
                  <ToggleButton id="metric" value='metric'>
                    &deg;C
                  </ToggleButton>
                </ToggleButtonGroup>   
                <Search onSearchChange={handleSearchChange}/>
              </Modal.Body>
            </Modal>           
            <Button variant="primary" onClick={showModal}>
              Change Location
            </Button>  
            <Button variant="primary" onClick={getCurrentLocation}>
              Get Position
            </Button>
            {currentWeather && <CurrentWeather currentWeather={currentWeather}/>}
            {currentForecast && <CurrentForecast currentForecast={currentForecast}/>}
          </Container>) 
}

// import Display from './components/display'


//   constructor(){
//     super()
//     this.state = {
//       zipCode: 75559,
//       zipCodeValid: false,
//       location: {
//         city: "",
//         state: "",
//         zip: ''
//       },
//       forcast: {
//         phrase: "",
//         icon: "",
//         currentTemp: "",
//         high: "", 
//         low: ""
//       },
//       openWeather_API_KEY: "87ee9d9eb500edc3fa8b18f1e1c97509",
//       

//     }
//   }

//   getLocation = () => {
//     const {zipCode, openWeather_API_KEY, mapquest_API_KEY} = this.state;

//     .then(data => {
//       const {name:city, coord: {lat, lon}, main:{temp, temp_max, temp_min}, weather} = data;
//       const {description, icon} = weather[0];

//       
//       .then(res => res.json())
//       .then(data => 
//         this.setState({
//           location: {
//             city: city,
//             state: data.results[0].locations[0].adminArea3,
//             zip: zipCode
//           },
//           forcast: {
//             phrase: description,
//             icon: icon,
//             currentTemp: temp,
//             high: temp_max,
//             low: temp_min
//           }
//         })
//       )
//     })
//   }

//   onChange = event => {
//     const zipRegex = /^\d{5}$/
//     const {value} = event.target
//     this.setState({
//       zipCode: value,
//       zipCodeValid: zipRegex.test(value)
//     })
//   }

//   onSubmit = (event) =>{
//     event.preventDefault();
//     if(this.state.zipCodeValid){
//       this.getLocation()
//     }else{
//       alert("Please enter a valid zip code.")
//     }
//   }

//   componentDidMount(){
//     this.getLocation();
//   }

//   
//     const {location, forcast} = this.state;

//       
//         <header className="App-header">
//           Weather App
//         </header>
//         <main className="container">
//           <Display forcast={forcast} location={location}/>

//           <form onSubmit={this.onSubmit}>
//             <label>
//               <input type="text" 
//                     name="zipCode" 
//                     value = {this.state.zipCode}
//                     onChange={this.onChange}
//               />
//             </label>            
//             <p>Please enter a valid zip code.</p>
//             <input type="submit" value="Get Data" />
//           </form>
//         </main>
//       
//     
//   }
// }
export default App;
