export function getCities(state = [], action){
    switch (action.type){
        case "FETCH_DATA_SUCCESS":
            return action.cities;
        default:
            return state;
    }
}

export function citiesHasErrored(state = false, action){
    switch (action.type) {
        case "CITIES_HAS_ERRORED":
            return action.hasErrored;
        default:
            return state;
    }
}

export function citiesIsLoading(state = false, action) {
    switch (action.type) {
        case "CITIES_IS_LOADING":
            return action.isLoading;
        default:
            return state;
    }
}

export function citiesUpdated(state = false, action) {
    switch (action.type) {
        case "PERSONS_WAS_UPDATED":
            return action.wasUpdated;
        default:
            return state;
    }
}
