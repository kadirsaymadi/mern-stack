export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";
export const CHANGE_PROJECT_VERSION = "CHANGE_PROJECT_VERSION";
export const SIGN_OUT = "SIGN_OUT";

// login action
export const login = (user) => {
    return {
        type: "SIGN_IN", // action type
        payload: {
            request: { // requiest data
                url: '/sign-in',
                method: 'POST',
                data: user
            }
        }
    }
}