import {
    SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL, CHANGE_PROJECT_VERSION, SIGN_OUT
} from "../actions/user"; // action types

// default initial state
const INITIAL_STATE = {
    projectVersion: null,
    loginLoading: false,
    token: null,
    user: {
        _id: null,
    },
};

let parseJwt = (user) => {
    var base64Url = user.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                loginLoading: true,
                token: null
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                user: parseJwt(action.payload.data.response.token),
                token: action.payload.data.response.token
            };
        case SIGN_IN_FAIL:
            return {
                ...state,
                loginLoading: false,
                token: null
            };

        case CHANGE_PROJECT_VERSION:
            return {
                ...state,
                projectVersion: action.payload.data
            }
        case SIGN_OUT:
            return {
                ...state,
            }
        default:
            return { ...state };
    }
};