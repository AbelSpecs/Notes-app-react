import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import { activeNote } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes)

    const handleSave = () =>{
        
        dispatch(startSaveNote(note));
    }

    const handlePicture = () => {
        document.querySelector("#file-selector").click();
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        console.log(e.target)

        if(file){
            dispatch(startUploading(file))

        }
        
    }


    return (
        <div className="notes__appbar">
            <span>28 de agosto de 2020</span>

            <input id="file-selector" type = "file" style={{display: 'none'}} onChange={handleFileChange}/>

            <div>
                <button 
                    className="btn"
                    onClick={handlePicture}
                > 
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={handleSave}
                > 
                    Save
                </button>
            </div>
        </div>
    )
}
