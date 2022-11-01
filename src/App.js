import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { MAPBOX_API_KEY, MAPBOX_API_URL} from './api';
import { getWeatherData } from './services/weather-service';

//import Container from 'react-bootstrap/Container';
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
      if(modalShown) hideModal();
      const [latitude, longitude] = searchData.value.split(' ');
      //const forecastFormatted = await getWeatherData('forecast', unit, latitude, longitude); 
      const oneCall = await getWeatherData('onecall', unit, latitude, longitude); 
      const {current, daily, hourly} = oneCall;
      setCurrentWeather({currentCity: searchData.label, latitude, longitude, ...current});
      setCurrentForecast({daily, hourly});
  }

  const getCurrentLocation = () =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
  }

  function showPosition(position) {
    const {latitude, longitude} = position.coords;
    fetch(`${MAPBOX_API_URL}/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`)
      .then(res => res.json())
      .then(data =>{ 
        const {context} =data.features[0];
        handleSearchChange({
            label: `${context[1].text}, ${context[3].text}`, 
            value: `${latitude} ${longitude}`
        });
      })
      .catch(err => console.log(err))

  }

  useEffect(() => getCurrentLocation(), []);
  
  return (<>
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
            <Button variant="primary" onClick={showModal} className="btn-info">
              Change Location
            </Button>  
            <Button variant="primary" onClick={getCurrentLocation}>
              Get Position
            </Button>
            {currentWeather && <CurrentWeather currentWeather={currentWeather}/>}
            {currentForecast && <CurrentForecast currentForecast={currentForecast}/>}
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
