import './current-weather.scss';
import Card from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';

const CurrentWeather = (props) =>{
    const {main, currentCity, weather, wind} = props.currentWeather;
    const {feels_like, pressure, humidity, temp} = main;
    const {description, icon} = weather[0];
        return (<Card className=' mx-auto mt-3'>
                    <Card.Header>
                        <div>
                            <Card.Title className='city'>{currentCity}</Card.Title>
                        </div>
                    </Card.Header>
                     <Card.Body className='row'>
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