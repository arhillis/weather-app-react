import { useWeatherContext } from '../../context/weather-context';

import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Search from './search';

function SearchModal(){
    const {modalShown, hideModal, unit, handleUnitChange} = useWeatherContext();
    return (<Modal show={modalShown} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Location Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ToggleButtonGroup type="radio" name='temp-unit' value={unit} size='sm' onChange={handleUnitChange}>
                    <ToggleButton id="imperial" value='imperial'>
                        &deg;F
                    </ToggleButton>
                    <ToggleButton id="metric" value='metric'>
                        &deg;C
                    </ToggleButton>
                    </ToggleButtonGroup> 
                    <Search />
                </Modal.Body>
            </Modal>)
}

export default SearchModal