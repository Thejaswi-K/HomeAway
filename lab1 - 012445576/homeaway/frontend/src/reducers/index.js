import {combineReducers} from 'redux';
import LoginTravellerReducer from './loginTravellerReducer';
import LoginOwnerReducer from './loginOwnerReducer';

export default combineReducers({
    travellers : LoginTravellerReducer,
    owners: LoginOwnerReducer
});