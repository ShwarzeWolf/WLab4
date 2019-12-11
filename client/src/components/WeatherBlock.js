import React, {Component} from 'react';
import '../styles/weatherBlock.css'

class WeatherBlock extends Component {
    state = {
        weatherData: undefined,
        isLoading: false,
        errorOccurred: false,
        errorMessage: undefined,
        cityName: undefined,
        latitude: undefined,
        longitude: undefined
    };

    formRequest(city, longitude, latitude){
        if (!!city)
            return "//localhost:5000/weather?city=" +
                city;
        else if (!!latitude && !!longitude)
            return "//localhost:5000/weather/coordinates?lon=" + longitude + "&lat=" + latitude;

        return null;
    }

    getWeatherData = async(city, longitude, latitude) => {
        this.setState({isLoading: true});

        const URL = await this.formRequest(city, longitude, latitude);

        fetch(URL)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.cod === 200) {
                    this.setState({errorOccurred: false});
                    this.setState({errorMessage: undefined});
                    this.setState({weatherData: json});
                    this.setState({isLoading : false});
                }
                else {
                    this.setState({errorMessage: json.message});
                    this.setState({errorOccurred: true});
                    this.setState({isLoading : false});
                }
            });


    };

    componentDidMount() {
        this.getWeatherData(this.props.cityName, this.props.longitude, this.props.latitude);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cityName !== this.props.cityName ||
            prevProps.longitude !== this.props.longitude ||
            prevProps.latitude !== this.props.latitude) {
            this.getWeatherData(this.props.cityName, this.props.longitude, this.props.latitude);
        }
    }

    render() {
        const weatherData = this.state.weatherData;

        if (this.state.isLoading)
            return(<div>Подождите, данные загружаются</div>);

        if (!weatherData)
            if (this.state.errorOccurred)
                return(
                    <div className="errorBlock">
                        <div>Что-то пошло не так. Причина:</div>
                        <div>{this.state.errorMessage}</div>
                    </div>
                );
            else
                return null;

        const iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

        return (
            <div className="weatherInfo">
                <div className="weatherMain">{weatherData.name} <img src={iconUrl} alt={weatherData.description} /></div>
                <div className="weatherSpecified">
                    <div className="weatherLine">Температура: {(weatherData.main.temp - 273.15).toFixed(2)}°</div>
                    <div className="weatherLine">Ветер: {weatherData.wind.speed}</div>
                    <div className="weatherLine">Облачность: {weatherData.clouds.all}</div>
                    <div className="weatherLine">Давление: {weatherData.main.pressure}</div>
                    <div className="weatherLine">Влажность: {weatherData.main.humidity} </div>
                    <div className="weatherLine">Координаты: [{weatherData.coord.lon} {weatherData.coord.lat}]</div>
                </div>
            </div>
        );
    }
}

export default WeatherBlock
