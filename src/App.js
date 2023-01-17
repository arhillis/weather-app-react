import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Container, Row, Col } from "react-bootstrap";

import CurrentWeather from "./components/current-weather";
import HourlyForecast from './components/hourly-forecast';
import Menu from "./components/menu";
import DailyForecast from "./components/daily-forecast";
import SearchModal from "./components/search/modal";

function App() {
  
  
  return (<Router>
        <Menu />
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Routes>
                <Route path="/" element={<CurrentWeather />} />
                <Route path="/daily-forecast" element={<DailyForecast />} />
                <Route path="/hourly-forecast" element={<HourlyForecast />} />
              </Routes>
            </Col>
          </Row>
        </Container>
        <SearchModal /> 
      </Router> ) 
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
