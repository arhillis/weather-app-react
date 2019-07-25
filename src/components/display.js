import React, { Component } from 'react';

class Display extends Component {
    render() {
        const {forcast: {currentTemp, high, low, phrase}, location: {city, state, zip}} = this.props;
        return (
            <div>
                <h3>
                Forcast for {city}, {state} {zip}
                </h3>
                <p>{phrase}</p>
                <p>Current tempeture: {currentTemp}</p>
                <p>High: {high}</p>
                <p>Low: {low}</p>
            </div>
        );
    }
}

export default Display;