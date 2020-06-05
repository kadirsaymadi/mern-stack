import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { PROJECT_VERSION } from '../../../helper/config';
import "../../../styles/login.css";
import { useDispatch } from 'react-redux';
import { login, CHANGE_PROJECT_VERSION, SIGN_OUT } from '../../../actions/user';
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // default page state
    const [state, setState] = useState({
        email: '',
        password: '',
        messageKey: "",
    });


    // on loading clear local storage
    useEffect(() => {
        dispatch({
            type: SIGN_OUT,
            payload: {}
        })
    }, [dispatch]);

    // all input text on change event
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }
    // handle login submit
    const loginSubmit = async (state) => {
        dispatch(login(state)).then(({ payload }) => {
            if (payload && payload.data && payload.data.statusCode === 200) {
                dispatch({
                    type: CHANGE_PROJECT_VERSION,
                    payload: {
                        data: PROJECT_VERSION
                    }
                })
                enqueueSnackbar("Oturum başarıyla gerçekleşti!", {
                    variant: "success",
                    autoHideDuration: 3000
                });

                history.push("/")
            } else if (payload && payload.data && payload.data.statusCode !== 200) {
                enqueueSnackbar(payload.data.message, {
                    variant: "error",
                    persist: true,
                    action: (
                        <div style={{ color: "#000", fontSize: "13px", cursor: "pointer", fontWeight: "500" }} onClick={() => closeSnackbar()}>KAPAT</div>
                    ),
                });
            } else {
                enqueueSnackbar("An error occurred during the process, please try again..", {
                    variant: "error",
                    persist: true,
                    action: (
                        <div style={{ color: "#000", fontSize: "13px", cursor: "pointer", fontWeight: "500" }} onClick={() => closeSnackbar()}>KAPAT</div>
                    ),
                });
            }
        });
    }
    return (
        <div>
            {/* <div className="loading" /> */}
            <div className="loginMain">
                <div className="login">
                    <form className="box" onSubmit={(e) => { e.preventDefault(); loginSubmit(state) }}>
                        <img src="https://malcoded.com/static/713b40a34ef44b9c6180fa626bf45937/6ff5e/nodejs-cli-banner.png" alt="APL Login" />
                        <div className="input-box">
                            <label htmlFor="E-mail">E-mail</label>
                            <input onChange={e => handleInputChange(e)} type="email" name="email" placeholder="Enter your e-mail" />
                        </div>
                        <div className="input-box">
                            <label htmlFor="Password">Password</label>
                            <input type="password" onChange={e => handleInputChange(e)} name="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit">Login</button>
                        <div className="footer-box">
                            <p><strong>© APL. All rights reserved</strong></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;
