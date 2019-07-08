import * as type from "./types";

export const signIn = (userId) => {
    return {
        type: type.SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: type.SIGN_OUT
    }
};

