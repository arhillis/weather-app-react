import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu(){
    return (<Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand> 
                            <Link to='/' className='nav-link'>
                                Weather app
                            </Link>
                    </Navbar.Brand>
                    <Nav>
                        <Link to='/' className='nav-link'>
                            Home
                        </Link>
                        <Link to='/daily-forecast' className='nav-link'>
                            Daily Forecast
                        </Link>
                    </Nav>
                </Container>
    </Navbar>)
}

export default Menu;