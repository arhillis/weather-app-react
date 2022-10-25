import './current-forecast.scss';
import { Accordion} from 'react-bootstrap';//, ListGroup 

import Header from './header';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']



//                 const {icon, description} = item.weather[0];
//                 const {feels_like, humidity, pressure, sea_level, temp_max, temp_min} = item.main;
//                
//                             
//                                 
//                                                                        
//                                 
//                                 
//                                     
//    
//                             
//                                     <ListGroup variant="flush" className='details'>
//                                         <ListGroup.Item> 
//                                             <span className='label'>Feels Like:</span>
//                                             <span className='value'>{feels_like}&deg;F</span>
//                                         </ListGroup.Item>
//                                         <ListGroup.Item> 
//                                             <span className='label'>Pressure:</span>
//                                             <span className='value'>{pressure} hPa</span>
//                                         </ListGroup.Item>
//                                         <ListGroup.Item>
//                                             <span className='label'>Humidity:</span>
//                                             <span className='value'>{humidity}%</span>
//                                         </ListGroup.Item>
//                                         <ListGroup.Item>                                            
//                                             <span className='label'>Clouds:</span>
//                                             <span className='value'>{item.clouds.all}</span> 
//                                         </ListGroup.Item>
//                                         <ListGroup.Item>                                          
//                                             <span className='label'>Wind Speed: </span>
//                                             <span className='value'>{item.wind.speed} mph</span>                                             
//                                         </ListGroup.Item>
//                                         <ListGroup.Item>                                          
//                                             <span className='label'>Sea Level: </span>
//                                             <span className='value'>{sea_level}</span>                                             
//                                         </ListGroup.Item>
//                                     </ListGroup>       

function CurrentForecast(props){
    const {daily} = props.currentForecast;//, hourly
    const dayOfTheWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayOfTheWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayOfTheWeek));

    return (<div className='forecast'>
                <label>Forecast</label>
                <Accordion>
                    {daily.slice(1).map((day, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                                <Header day={day} dayOfTheWeek={forecastDays[index]}/>
                                {/*  <div>
                                     <img alt="Weather icon" 
                                            src={`icons/${weather[0].icon}.png`} 
                                            width='30'
                                     />
                                     {weather[0].description}
                                </div> */}
                            </Accordion.Header>
                            <Accordion.Body>
                                Body goes here...
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}                  
                </Accordion>          
            </div>)
}

export default CurrentForecast;