import './current-forecast.scss';
import { Accordion, ListGroup } from 'react-bootstrap';

//import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const CurrentForecast = (props) => {
    const {list} = props.currentForecast;
    const dayOfTheWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayOfTheWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayOfTheWeek));
    return (<div className="forecast">
        <label>Forecast</label>      
        <Accordion>
            {list.slice(0, 7).map((item, index) =>{
                const {icon, description} = item.weather[0];
                const {feels_like, humidity, pressure, sea_level, temp_max, temp_min} = item.main;
                return (<Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                                <div className='day'>
                                    {forecastDays[index]}                                    
                                </div>
                                <div>
                                    {Math.round(temp_max)}&deg;F / {Math.round(temp_min)}&deg;F
                                </div>
                                <div>
                                    <img alt="Weather icon" 
                                            src={`icons/${icon}.png`} 
                                            width='30'
                                    />
                                    {description}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                    <ListGroup variant="flush" className='details'>
                                        <ListGroup.Item> 
                                            <span className='label'>Feels Like:</span>
                                            <span className='value'>{feels_like}&deg;F</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item> 
                                            <span className='label'>Pressure:</span>
                                            <span className='value'>{pressure} hPa</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span className='label'>Humidity:</span>
                                            <span className='value'>{humidity}%</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>                                            
                                            <span className='label'>Clouds:</span>
                                            <span className='value'>{item.clouds.all}</span> 
                                        </ListGroup.Item>
                                        <ListGroup.Item>                                          
                                            <span className='label'>Wind Speed: </span>
                                            <span className='value'>{item.wind.speed} mph</span>                                             
                                        </ListGroup.Item>
                                        <ListGroup.Item>                                          
                                            <span className='label'>Sea Level: </span>
                                            <span className='value'>{sea_level}</span>                                             
                                        </ListGroup.Item>
                                    </ListGroup>                               
                            </Accordion.Body>
                        </Accordion.Item>)
            })}
        </Accordion>  
    </div>)
}

export default CurrentForecast;