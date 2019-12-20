import React, {Component} from 'react';
import {connect} from "react-redux";
import WeatherBlock from "./WeatherBlock";
import RemoveCity from "./RemoveCity";
import AddCity from "./AddCity";
import {addCity, removeCity} from "../actions/actions"

import {fetchFavouriteCities} from "../actions/favouriteCitiesActions";

class FavouriteCities extends Component {
    componentDidMount() {
        this.props.fetchData("http://localhost:5000/favourites")
    }

    render() {
        if(this.props.hasErrored){
            return <p> Извините, произошла ошибка при загрузке избранных городов</p>
        }
        if(this.props.isLoading){
            return <p> Загрузка... </p>
        }
            return (
                <div className="favouriteCities">
                    <h1 className="blockHeader">Избранное </h1>
                    <ul>{this.props.cities.map((city, index)=>{
                        return <li key={index}>
                            <div> {city.cityname}</div>
                            <div>{city.cityid}</div>
                        </li>
                    })}
                    </ul>
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
        fetchData: url=> (dispatch(fetchFavouriteCities(url)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCities);

/*
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: url => dispatch(fetchFavouriteCities(url)) /*,
        addCity: city => dispatch(addCity(city)),
        removeCity: city => dispatch(removeCity(city)),
    };
};

const mapStateToProps = state => {
    return {
        cities: state.cities
    };
};

class ConnectedFavouriteCities extends Component {
   /* state = {
        ID : 0
    };

    addCity = (cityName) => {
        this.props.addCity({
            name: cityName,
            id: this.state.ID
        });

        let currentID = this.state.ID + 1;
        this.setState({ID: currentID});
    };

    removeCity = (city) => {
        this.props.removeCity(city);
    };//

    formatCities = (cities) => {
        console.log(cities);
        return cities.map((city) =>
            <div className="weatherItem"
                key={city.id}>
                <RemoveCity city={city} removeCity={this.removeCity}/>
                <WeatherBlock cityName={city.name}/>
            </div>
        );
    };

    componentDidMount() {
        this.props.fetchData("http://localhost:5000/favourites");
    };

    render() {
        console.log();
        if (this.props.cities === undefined)
            return(<div>Data is Loading</div>);
        else
        return (
            <div className="favouriteCities">
                <h1 className="blockHeader">Избранное </h1>
                <p>{this.props.cities}</p>
            </div>
        );
    }
}

/*<div className="favouriteCity">{
                    this.formatCities(this.props.cities)
                }</div>*/
/*<AddCity addCity={this.addCity}/>
const FavouriteCities = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedFavouriteCities);

export default FavouriteCities
*/
