import React, { useEffect, useState } from 'react';

const SearchWeather = () => {
    const [search, setSearch] = useState('Karur');
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');

    // Track whether the component is mounted
    let componentMounted = true;


    // Fetching weather data using OpenWeatherMap API
    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=cdd290bef940ba10d80b80bcdbc1a8e4`);
            if (componentMounted) {
                setData(await response.json());
                console.log(data);
            }
            return () => {
                //set to false when the component is unmounted
                componentMounted = false;
            }
        }
        // Calling the fetchWeather function
        fetchWeather();
    }, [search]);

    // implementing emoji icon based on weather condition
    let emoji = undefined;
    // checking if data.main exists before accessing its properties
    if (typeof data.main != 'undefined') {
        if (data.weather[0].main == 'Clouds') {
            emoji = 'fa-cloud'
        } else if (data.weather[0].main == 'Thunderstrom') {
            emoji = 'fa-bolt'
        } else if (data.weather[0].main == 'Drizzle') {
            emoji = 'fa-cloud-rain'
        } else if (data.weather[0].main == 'Rain') {
            emoji = 'fa-cloud-shower-heavy'
        } else if (data.weather[0].main == 'Snow') {
            emoji = 'fa-snow-flake'
        } else {
            emoji = 'fa-smog'
        }
    } else {
        // displaying loading message if weather data is not yet fetched
        return (
            <div>....Loading</div>
        )
    }

    // calculate the temperature values in Celsius
    let temp = data.main ? (data.main.temp - 273.15).toFixed(2) : '';
    let temp_min = data.main ? (data.main.temp_min - 273.15).toFixed(2) : '';
    let temp_max = data.main ? (data.main.temp_max - 273.15).toFixed(2) : '';

    // Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString('default', { month: 'long' });
    let day = d.toLocaleString('default', { weekday: 'long' });

    // Time
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    //Handling the submission for search
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }


    return (
        <div className='container py-3'>
            <div className="row justify-content-center">
                    <h1 className='text-center p-2'>Weather App</h1>
                <div className="col-md-5">
                    <div className="card text-white text-center border-0  ">
                        <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} className="card-img " alt="..." />
                        <div className="card-img-overlay d-flex flex-column justify-content-center">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-4 w-100 mx-auto">
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search City"
                                        aria-label="Search City"
                                        aria-describedby="basic-addon2"
                                        name='search'
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        required
                                    />
                                    <button type='submit' className="input-group-text" id="basic-addon2">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                                <div className="bg bg-dark bg-opacity-50 py-2 rounded">
                                    <h5 className="card-title">{data.name}</h5>
                                    <p className="card-text lead">
                                        {day}, {month} {date}, {year}
                                        <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fa fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'>{temp} &deg;C</h1>
                                    <p className="lead fw-bolder mb-0">{data.weather && data.weather.length > 0 ? data.weather[0].main : ''}</p>
                                    <p className="lead">{temp_min}&deg;C | {temp_max}&deg;C</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchWeather;