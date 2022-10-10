import './current-weather.scss';
import Card from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';

const CurrentWeather = (props) =>{
    const {main} = props.currentWeather;
    if(main){
        const {feels_like, pressure, humidity, temp} = main;
        return (<Card className=' mx-auto mt-3'>
                    <Card.Header>
                        <div>
                            <Card.Title className='city'>Belgrade</Card.Title>
                                <div className="temperature">
                                    {temp} &deg;c
                                </div>
                        </div>
                        <div>
                            <Card.Img variant="top" src="icons/01d.png" />
                            <p className='weather-description'>Sunny</p>
                        </div>
                    </Card.Header>
                     <Card.Body>
                         <h5>Details</h5>
                         <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <span>Feels Like</span>
                                <span>{feels_like} &deg;c</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span >Wind</span>
                                <span>2 m/s</span>
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
                     </Card.Body>
            </Card>)
    }  


    return    (<Card className='mx-auto mt-3'>
            <Card.Body>
                No data to show
            </Card.Body>
        </Card>)
}

export default CurrentWeather;