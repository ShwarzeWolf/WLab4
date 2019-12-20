export function fetchFavouriteCitiesSuccess(cities){
    return {
        type: "FETCH_DATA_SUCCESS",
        cities
    }
}

export function fetchFavouriteCities(url){
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if (!response.ok)
                    throw new Error(response.statusText);
                return response;
            })
            .then(response => response.json())
            .then(cities =>  dispatch(fetchFavouriteCitiesSuccess(cities)));
    }
}


