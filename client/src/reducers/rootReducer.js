import {combineReducers} from "redux";
import {cities, citiesHasErrored, citiesIsLoading} from "./cities";

const rootReducer = combineReducers({
    cities,
    citiesHasErrored,
    citiesIsLoading
});

export default rootReducer;
