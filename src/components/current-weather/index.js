import React, { useState, useEffect } from 'react';
import './current-weather.scss';
import Card from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';

const CurrentWeather = (props) =>{
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const {main, currentCity, weather, wind, coord} = props.currentWeather;
    const {lat, lon} = coord;
    const {feels_like, pressure, humidity, temp} = main;
    const {description, icon} = weather[0];

    useEffect(() =>{
        fetch(`https://api.ipgeolocation.io/timezone?apiKey=48648a513e7542e2b5e6df76045ca32d&lat=${lat}&long=${lon}`)
            .then(res => res.json())
            .then(data => {
                console.log('Data fetched!!!');
                const dateStr = data.date_time_txt.split(' ');
                setDate(`${dateStr['0']} ${dateStr['1']} ${dateStr['2']} ${dateStr['3']}`);
                setTime(`${data.time_12.slice(0, 5)}${data.time_12.slice(8, 11)}`);         
            })
            .catch(err => console.log(err));
    }, [lat, lon] )


        return (<Card className=' mx-auto mt-3'>
                    <Card.Header>
                        <div>
                            <Card.Title>{currentCity}</Card.Title>
                        </div> 
                    </Card.Header>
                     <Card.Body className='row'>   
                        <div className="date-time col-12">
                            <p className='date'>{date}</p>
                            <p className='time'>Local Time: {time}</p>                             
                        </div>                    
                        <div className="temperature col-6">
                            {Math.round(temp)} &deg;F
                            <div className='icon'>
                                <Card.Img variant="top" src={`icons/${icon}.png`} />
                                <p className='weather-description'>{description}</p>
                            </div>
                        </div>
                        <div className="details col-6">
                            <h5>Details</h5>  
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <span>Feels Like</span>
                                    <span>{Math.round(feels_like)} &deg;F</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span >Wind</span>
                                    <span>{Math.round(wind.speed)} m/s</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span>Humidity</span>
                                    <span>{humidity}%</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span>Pressure</span>
                                    <span>{pressure} hPa</span>
                                </ListGroup.Item>
                            </ListGroup> 
                        </div>   
                     </Card.Body>
            </Card>)
   
}

export default CurrentWeather;