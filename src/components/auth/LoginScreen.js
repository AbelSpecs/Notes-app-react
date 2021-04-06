import React from 'react';
import {
    Link
  } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { login, startGoogleLogin, startLoginEmailPass } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.ui)

    const [values, handleInputChange, reset] = useForm({
       email: 'eltopodivino@gmail.com',
       password: '1234' 
    });

    const {email, password} = values

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPass(email, password));
    }

    const handleGoogleLogin = () =>{
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                <hr />
                
                <div>
                    <p className="auth__social-networks">Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link" to="/auth/register">
                    Create new account
                </Link>

            </form>
        </>
    )
}
