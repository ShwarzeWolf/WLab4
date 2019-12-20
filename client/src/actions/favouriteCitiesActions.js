export function fetchFavouriteCitiesSuccess(cities){
    return {
        type: "FETCH_DATA_SUCCESS",
        cities
    }
}

export function fetchFavouriteCities(url){
    return (dispatch) => {
        dispatch(citiesIsLoading(true));

        fetch(url)
            .then(response => {
                if (!response.ok)
                    throw new Error(response.statusText);
                dispatch(citiesIsLoading(false));
                return response;
            })
            .then(response => response.json())
            .then(cities =>  dispatch(fetchFavouriteCitiesSuccess(cities)))
            .catch(() => dispatch(citiesHasErrored(true)));
    }
}

export function citiesHasErrored(bool) {
    return {
        type: "CITIES_HAS_ERRORED",
        hasErrored: bool
    }
}

export function citiesIsLoading(bool) {
    return {
        type: "CITIES_IS_LOADING",
        isLoading: bool
    }
}

export function addCity(payload) {
    return {
        type: "ADD_CITY",
        payload
    }
}

export function removeCity(payload) {
    return {
        type: "REMOVE_CITY",
        payload
    }
}

