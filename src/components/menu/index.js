import { Link } from 'react-router-dom';
import { useWeatherContext } from '../../context/weather-context';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

function Menu(){
    const {getCurrentLocation, showModal} = useWeatherContext();
    
    return (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
                <Container>
                    <Link to='/' className='navbar-brand'>
                        Weather app
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/' className='nav-link'>
                            Current Weather
                        </Link>
                        <NavDropdown title="Forecast" id="collasible-nav-dropdown">
                            <Link to='/daily-forecast' className='dropdown-item'>
                                Daily
                            </Link>
                        <NavDropdown.Item href="#action/3.2">
                            Hourly
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Button variant="outline-light" size="sm" onClick={getCurrentLocation} className='mx-1'>Current Location</Button>
                        <Button variant="outline-light" size="sm" onClick={showModal}>Change Location</Button>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>)
}

export default Menu;