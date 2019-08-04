import { combineReducers } from 'redux';
import { UPDATE_CITY } from '../actions/types';

const initialState = {
	cityData: {}
};

const CityReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CITY:
			return { cityData: action.payload };
		default:
			return state;
	}
};

export default combineReducers({
	city: CityReducer
});
