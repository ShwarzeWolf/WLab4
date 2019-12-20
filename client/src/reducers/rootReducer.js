import {combineReducers} from "redux";
import {getCities, citiesHasErrored, citiesIsLoading} from "./getCities";

const rootReducer = combineReducers({
    cities: getCities,
    citiesHasErrored,
    citiesIsLoading
});

export default rootReducer;
