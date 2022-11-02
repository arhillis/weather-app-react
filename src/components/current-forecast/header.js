function Header(props){
    const {day: {
            dt,
            temp: {max, min},
            weather: [desc]
        }
    } = props;
    const {description, icon} = desc;
    const dateObj = new Date(dt * 1000);
    return (<>
                <div className="day">
                    {dateObj.toDateString().slice(0, 10)}
                </div>
                <div>{Math.round(max)}&deg;F / {Math.round(min)}&deg;F</div>  
                <div>
                    <img alt="Weather icon" 
                        src={`icons/${icon}.png`} 
                        width='30'
                    />
                        {description}
                    </div>
            </>)
}

export default Header;