export function fetchFavouriteCitiesSuccess(cities){
    return {
        type: "FETCH_DATA_SUCCESS",
        cities
    }
}

export function citiesUpdated(bool) {
    return {
        type: "CITIES_WAS_UPDATED",
        wasUpdated: bool
    }
}

export function citiesIsLoading(bool) {
    return {
        type: "CITIES_IS_LOADING",
        isLoading: bool
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
                dispatch(citiesUpdated(false));
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


/*
export function addCitySuccess(payload) {
    return {type: "ADD_CITY", payload}
}
*/
export function addCity(data) {
    return dispatch => {
        let url = "http://localhost:5000/favourites?cityname=" + data.cityname;
        fetch(url, {
            method: "POST"
        })
            .then(response => response.json())
            .then(response => {
                if (response.dbError) {
                    throw new Error(response.dbError);
                }
                dispatch(citiesUpdated(true));
              //  dispatch(addCitySuccess(data));
                return response;
            })
            .catch(error =>{ alert(error.toString())});

    }
}

export function removeCity(data) {
    return dispatch => {
        let url = "http://localhost:5000/favourites?cityid=" + data.id;
        fetch(url, {
            method: "DELETE"
        })
            .then(response => {
                dispatch(citiesUpdated(true));
                return response
            })
            .then(response => response.json())
            .catch((error)=> {console.log("Something went wrong while deleting a city")})
    }
}
