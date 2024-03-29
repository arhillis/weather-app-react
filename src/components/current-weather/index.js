import PropTypes from 'prop-types';
import './current-weather.scss';
import { useWeatherContext } from '../../context/weather-context'; 

import Card from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';

const CurrentWeather = () =>{
    const {currentWeather} = useWeatherContext();

    if(!currentWeather){
        return (<div className=' mx-auto mt-3'>
            Loading data...
        </div>)
    }

    const {
        currentCity, dt, feels_like, humidity, pressure, temp, degUnit, wind_speed,
        weather: [{description, icon}],
    } = currentWeather;
    const dateObj = new Date(dt * 1000);

    return (<><h1 className='py-3'>{currentCity}</h1>
                <h2>Current Weather</h2>
            <Card className=' mx-auto mt-3'>
                    <Card.Body className='row'>  
                        <div className="date-time col-6">
                            <p className='time'>Local Date and Time: </p>                                                       
                        </div>     
                        <div className="date-time col-6">
                            {dateObj.toLocaleString('en-us', {
                                                        weekday: 'long',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: '2-digit'
                                                    })}
                        </div>
                        <div className="temperature col-6">
                            {Math.round(temp)} &deg;{degUnit}
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
                                    <span>{Math.round(feels_like)} &deg;{degUnit}</span>
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
                </Card></>)
   
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