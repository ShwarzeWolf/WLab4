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

export function addCity(data) {
    //check if city makes sense
    //check if city exists in database
    return dispatch => {
        let url = "http://localhost:5000/favourites?cityname=" + data.cityname;
        fetch(url, {
            method: "POST"
        })
            .then(response => {
                return response
            })
            .then(response => response.json())
            .catch(()=>{console.log("Something went wrong while adding new city")})
    }
}

export function removeCity(data) {
    return dispatch => {
        let url = "http://localhost:5000/favourites?cityid=" + data.id;
        fetch(url, {
            method: "DELETE"
        })
            .then(response => {
                return response
            })
            .then(response => response.json())
            .catch(()=> {console.log("Something went wrong while deleting city")})
    }
}
