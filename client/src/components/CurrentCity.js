import React, {Component} from 'react';
import WeatherBlock from "./WeatherBlock";

class CurrentCity extends Component{
    constructor(props){
        super(props);
        this.state = {
            cityName : undefined,
            latitude : undefined,
            longitude: undefined
        };

        this.getLocationButtonPress = this.getLocationButtonPress.bind(this);
        this.getLocationSuccess = this.getLocationSuccess.bind(this);
        this.getLocationFailed = this.getLocationFailed.bind(this);
    }

    getLocationSuccess = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            cityName: undefined
        });
    };

    getLocationFailed = () => {
        this.setState({
            latitude: undefined,
            longitude: undefined,
            cityName: "Surgut"
        });
    };

    getLocationButtonPress = (event) => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
            position => this.getLocationSuccess(position),
            function() {
                alert("GEO access denied. Change setting in browser for this site")
            });
    };

    render(){
        navigator.geolocation.getCurrentPosition(
            position => this.getLocationSuccess(position),
            this.getLocationFailed);

        if (typeof(this.state.cityName) == "undefined" &&
            typeof(this.state.longitude) == "undefined" &&
            typeof(this.state.latitude) == "undefined")
            return (<h1>Получение инфорации о геолокации...</h1>);

        return(
            <div className="currentCity">
                <h1>Погода здесь</h1>
                    <form className="updateGeoLocation" onSubmit={this.getLocationButtonPress}>
                        <button>Обновить геолокацию</button>
                    </form>
                <WeatherBlock cityName={this.state.cityName} latitude={this.state.latitude} longitude={this.state.longitude} />
            </div>
        )
    };
}

export default CurrentCity
