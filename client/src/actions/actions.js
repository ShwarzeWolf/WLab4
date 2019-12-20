export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export function addCity(payload) {
    return {type: ADD_CITY, payload}
}

export function removeCity(payload) {
    return {type: REMOVE_CITY, payload}
}

export function fetchFavouriteCitiesSuccess(cities){
    //console.log(cities);
        return {
            type: "FETCH_DATA_SUCCESS",
            cities
        }
}

export function fetchFavouriteCities(url){
    return (dispatch) => fetch(url)
            .then(response => {
                if (response.ok)
                    return response.json();
            })
        .then(cities =>  dispatch(fetchFavouriteCitiesSuccess(cities)));
    }

