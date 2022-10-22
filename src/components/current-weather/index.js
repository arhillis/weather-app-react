import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './current-weather.scss';
import { IP_GEO_API_KEY, IP_GEO_API_URL} from '../../api';

import Card from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';

const CurrentWeather = (props) =>{
    console.log(props);
    const {
        currentCity, feels_like, humidity, latitude, longitude, pressure, temp, wind_speed,
        weather: [{description, icon}],
    } = props.currentWeather;

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() =>{
        fetch(`${IP_GEO_API_URL}?apiKey=${IP_GEO_API_KEY}&lat=${latitude}&long=${longitude}`)
            .then(res => res.json())
            .then(data => {
                console.log('Data fetched!!!');
                const dateStr = data.date_time_txt.split(' ');
                setDate(`${dateStr['0']} ${dateStr['1']} ${dateStr['2']} ${dateStr['3']}`);
                setTime(`${data.time_12.slice(0, 5)}${data.time_12.slice(8, 11)}`);         
            })
            .catch(err => console.log(err));
    }, [latitude, longitude] )


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
                                    <span>{Math.round(wind_speed)} m/s</span>
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

CurrentWeather.defaultProps = {
    currentCity: 'Anywhere' 
}

CurrentWeather.propTypes = {
    currentWeather: PropTypes.shape({
        currentCity: PropTypes.string,
        feels_like: PropTypes.number,
        humidity: PropTypes.number,
        latitude: PropTypes.string,
        longitude: PropTypes.string,
        pressure: PropTypes.number,
        wind_speed: PropTypes.number,
        weather: PropTypes.array
    })
};

export default CurrentWeather;