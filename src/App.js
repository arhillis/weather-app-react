import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { useWeatherContext } from './context/weather-context';

//import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Search from './components/search/search';
import CurrentWeather from './components/current-weather';
import CurrentForecast from './components/current-forecast';

function App() {
  const {modalShown, hideModal, showModal, unit, handleUnitChange, currentWeather, currentForecast, handleSearchChange, showPosition} = useWeatherContext();


  const getCurrentLocation = () =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
  }



  useEffect(() => getCurrentLocation(), []);
  
  return (<>
            <Modal show={modalShown} onHide={hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Location Search</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ToggleButtonGroup type="radio" name='temp-unit' value={unit} size='sm' onChange={handleUnitChange}>
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
            <Button variant="primary" onClick={showModal} className="btn-info">
              Change Location
            </Button>  
            <Button variant="primary" onClick={getCurrentLocation}>
              Get Position
            </Button>
            {currentWeather && <CurrentWeather />}
            {currentForecast && <CurrentForecast />}
          </>) 
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
