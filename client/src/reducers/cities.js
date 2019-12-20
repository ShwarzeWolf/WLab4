export function cities(state = [], action){
    switch (action.type){
        case "FETCH_DATA_SUCCESS":
            return action.cities;
        default:
            return state;
    }
}
