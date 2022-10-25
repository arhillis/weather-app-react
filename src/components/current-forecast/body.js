import { ListGroup } from "react-bootstrap";

function Body(props){
    const {clouds, feels_like, humidity, pressure, wind_speed, pop} = props.day;
    return (<ListGroup variant="flush" className='details'>
        <ListGroup.Item>
            <span className='label'>Feels Like:</span>
            <span className='value'>{Math.round(feels_like.day)}&deg;F</span>
        </ListGroup.Item>
        <ListGroup.Item>                                          
            <span className='label'>Chance of rain: </span>
            <span className='value'>{pop * 100.0}%</span>                                             
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
            <span className='value'>{clouds}</span> 
        </ListGroup.Item>
        <ListGroup.Item>                                          
            <span className='label'>Wind Speed: </span>
            <span className='value'>{wind_speed} mph</span>                                             
        </ListGroup.Item>
    </ListGroup> )
}

export default Body;