import {OWNER_LOGIN_SUCCESS,OWNER_LOGIN_FAILURE} from '../actions/index.js';

const initialState = {
    validationMessage:""

}

export default function(state = initialState, action){
    switch(action.type){
        case OWNER_LOGIN_SUCCESS:
            return {...state, validationMessage:action.message};
        case OWNER_LOGIN_FAILURE:
            return {...state, validationMessage:action.message};
        default:
            return state;
    }
}