/*import {ADD_CITY, REMOVE_CITY, FETCH_DATA_SUCCESS} from './actions/actions';

const initialState = {
    cities: []
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_DATA_SUCCESS:
            return action.cities;
       /* case ADD_CITY:
            return Object.assign({}, state, {
                cities: state.cities.concat(action.payload)
            });
        case REMOVE_CITY:
            return Object.assign({}, state, {
                cities: state.cities.filter(function (city) {
                    return city.id !== action.payload.id;
                })
            });//
        default:
            return state;
    }
}

export default rootReducer;
*/
