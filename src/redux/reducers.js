
import { combineReducers } from 'redux';
import { nearReducer } from './near';
import { validatorReducer } from './validator';

export default combineReducers({
	nearReducer,
	validatorReducer,
});
