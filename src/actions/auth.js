import Swal from 'sweetalert2';
import {firebase, gooogleAuthProvider} from '../firebase/firebase-config';
import { types } from "../types/types"
import { notesLogout } from './notes';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPass = (email, password) =>{
    return (dispatch) => {
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
                console.log(user);
            })
            .catch(error =>{
                console.log(error);
                dispatch(finishLoading());
                Swal.fire('Error',error.message, 'error');
            })
            
    }
}

export const startRegisterWithEmailPass = (email, password, name) =>{
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({user}) => {

                await user.updateProfile({displayName: name})
                console.log(user);
                dispatch(login(user.uid, user.displayName));
            })
            .catch(error =>{
                console.log(error);
            })
    }
}

export const startGoogleLogin = () =>{
    return (dispatch) => {
        firebase.auth().signInWithPopup(gooogleAuthProvider)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
            })
    }
}


export const login = (uid, displayName) =>  ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
})

export const startLogout = () => {
    return ((dispatch) => {
        firebase.auth().signOut();
        dispatch(notesLogout());
        dispatch(logout());
    })
}

export const logout = () => ({
    type: types.logout
})
