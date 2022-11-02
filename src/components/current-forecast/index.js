import './current-forecast.scss';
import { Accordion} from 'react-bootstrap';//, ListGroup 

import Header from './header';
import Body from './body';                                   

function CurrentForecast(props){
    const {daily} = props.currentForecast;//, hourly

    return (<div className='forecast'>
                <label>Forecast</label>
                <Accordion>
                    {daily.slice(1).map((day, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                                <Header day={day}/>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Body day={day} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}                  
                </Accordion>          
            </div>)
}

export default CurrentForecast;