import React from 'react'
import {
    Link
  } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPass } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui);

    console.log(msgError);

    const [values, handleInputChange, reset] = useForm({
        name: 'el Topo',
        email: 'eltopodivino@gmail.com',
        password: '123456',
        confirm: '123456'
    });

    const {name, email, password, confirm} = values;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if(isFormValid()) {
            console.log('Formulario correcto');
            dispatch(startRegisterWithEmailPass(email, password, name));
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            console.log('Name is invalid');
            dispatch(setError('Name is invalid'));
            return false;

        }else if(!validator.isEmail(email)){
            console.log('email is not valid');
            dispatch(setError('email is not valid'));
            return false;

        }else if( password !== confirm || password.length < 5){
            console.log('Password should be at least 6 characters');
            dispatch(setError('Password should be at least 6 characters'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
                <form onSubmit={handleRegister}>
                   {
                       
                       
                            msgError && 
                            <div className="auth__alert-error">
                                {msgError.msgError}
                            </div>
                        

                   }


                    <input 
                        type="text"
                        placeholder="name"
                        name="name"
                        className="auth__input"
                        autoComplete="off"
                        onChange={handleInputChange}
                        value={name}
                    />

                    <input 
                        type="text"
                        placeholder="email"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        onChange={handleInputChange}
                        value={email}
                    />
                    <input 
                        type="password"
                        placeholder="password"
                        name="password"
                        className="auth__input"
                        autoComplete="off"
                        onChange={handleInputChange}
                        value={password}
                    />

                    <input 
                        type="password"
                        placeholder="confirm"
                        name="confirm"
                        className="auth__input"
                        autoComplete="off"
                        onChange={handleInputChange}
                        value={confirm}
                    />

                    <button type="submit" className="btn btn-primary btn-block mb-5">Register</button>

                     
                    
                    
                    <Link className="link" to="/auth/login">
                        Already registered?
                    </Link>

                </form>
        </>
    )
}
