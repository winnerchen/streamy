import {combineReducers} from "redux";
import streamReducers from './streamReducers';
import authReducer from './authReducer';
import {reducer as formReducer} from "redux-form";


export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducers
});

