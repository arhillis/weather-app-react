import React, { Component } from 'react';

class Display extends Component {
    render() {
        const {forcast: {currentTemp, high, low, phrase}, location: {city, state, zip}} = this.props;
        return (
            <article className="one-day-display">
                <header>
                    <h2>
                    {city}, {state} {zip}
                    </h2>
                </header>
                <section>
                    <p className="current-temp">{currentTemp} &deg;F</p>
                    <p>{phrase.charAt(0).toUpperCase() + phrase.slice(1)}</p>
                </section>
                <section>
                    <p>High: {high} &deg;F</p>
                    <p>Low: {low} &deg;F</p>
                </section>
            </article>
        );
    }
}

export default Display;