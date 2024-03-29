import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {firebase} from '../firebase/firebase-config'
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes, startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        
        firebase.auth().onAuthStateChanged(async (user) => {
            
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid))
            }else{
                setIsLoggedIn(false);
            }
            
            setChecking(false);
        })
        
    }, [dispatch])

    if(checking){
        return(
            <h1>Wait....</h1>

        )
        
    }

    return (
        <Router>
            <div className="">
                
                    <Switch>
                        <PublicRoutes path="/auth" component={AuthRouter} isLoggedIn={isLoggedIn}/>

                        <PrivateRoutes exact path="/" component={JournalScreen} isLoggedIn={isLoggedIn}/>

                        <Redirect to="/auth/login"/>
                    </Switch>
               
            </div>
        </Router>
    )
}
