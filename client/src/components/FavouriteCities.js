import React, {Component} from 'react';
import {connect} from "react-redux";
import WeatherBlock from "./WeatherBlock";
import RemoveCity from "./RemoveCity";
import AddCity from "./AddCity";

import {fetchFavouriteCities, addCity, removeCity} from "../actions/favouriteCitiesActions";

class FavouriteCities extends Component {

    componentDidMount() {
        this.props.fetchData("http://localhost:5000/favourites")
    }

    componentDidUpdate(prevProps) {
        if(this.props.wasUpdated !== prevProps.wasUpdated) {
            this.props.fetchData("http://localhost:5000/favourites")
        }
    }

    addCity = (cityName) => {
        this.props.addCity({
            cityname: cityName
        });
    };

    removeCity = (city) => {
        this.props.removeCity(city);
    };

    formatCities = (cities) => {
        console.log(cities);

        if (cities.length === 0) {
            return <p> There are now favourite cities yet</p>;
        }

        return cities.map((city) =>
            <div className="weatherBlock"
                 key={city.id}>
                <RemoveCity city={city} removeCity={this.removeCity}/>
                <WeatherBlock cityName={city.cityname}/>
            </div>
        );
    };

    render() {
        if(this.props.hasErrored){
            return <p> Извините, произошла ошибка при загрузке избранных городов</p>
        }
        if(this.props.isLoading){
            return <p> Загрузка... </p>
        }
            return (
                <div className="favouriteCities">
                    <h1 className="blockHeader">Избранное</h1>
                    <AddCity addCity={this.addCity}/>
                    <div className="favouriteCity">{
                        this.formatCities(this.props.cities)
                    }
                    </div>
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        cities: state.cities,
        hasErrored: state.citiesHasErrored,
        isLoading: state.citiesIsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCity: city => dispatch(addCity(city)),
        removeCity: city => dispatch(removeCity(city)),
        fetchData: url => (dispatch(fetchFavouriteCities(url)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCities);
