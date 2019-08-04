import { UPDATE_CITY } from './types';

export const updateCityData = data => {
	return {
		type: UPDATE_CITY,
		payload: data
	};
};
