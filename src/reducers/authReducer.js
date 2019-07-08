import * as type from "../actions/types";


const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};


export default (auth = INITIAL_STATE, action) => {
    switch (action.type) {
        case type.SIGN_IN :
            return {...auth, isSignedIn: true, userId: action.payload};
        case type.SIGN_OUT:
            return {...auth, isSignedIn: false, userId: null};
        default:
            return auth;
    }
};
