import React from 'react'
import { NoteScreen } from '../notes/NoteScreen'
import {useDispatch, useSelector} from 'react-redux';
import { NothigSelected } from './NothigSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const {active} = useSelector(state => state.notes)

    console.log(active);

    return (
        <div className="journal__main-content">
            
            <Sidebar />

            <main>
                {
                    (active) 
                    ? 
                    (<NoteScreen />) 
                    : 
                    (<NothigSelected />)
                }
                
                
            </main>

        </div>
    )
}
