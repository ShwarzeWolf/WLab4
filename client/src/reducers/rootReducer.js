import {combineReducers} from "redux";
import {getCities, citiesHasErrored, citiesIsLoading, citiesUpdated} from "./getCities";

const rootReducer = combineReducers({
    cities: getCities,
    citiesHasErrored,
    citiesIsLoading,
    citiesUpdated
});

export default rootReducer;
