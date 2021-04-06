import React, {useEffect, useRef} from 'react'
import { NotesAppBar } from './NotesAppBar'
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDelete } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes)
    console.log(note);

    const [values, handleInputChange, reset] = useForm(note);
    const {title, body} = values;
    console.log(values);
    
    const actualId = useRef(note.id); 
    const actualUrl = useRef(note.url);

    useEffect(() => {
        
        if( note.id !== actualId.current){
            reset(note);
            actualId.current = note.id
        }

        if( note.url !== actualUrl.current){
            reset(note);
            actualUrl.current = note.url;
        }
        
    }, [note, reset])

    useEffect(() => {
        
        dispatch(activeNote(values.id, {...values}))

    }, [values, dispatch])

    const handleDelete = () => {
        dispatch(startDelete(actualId.current));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="title" 
                    className="notes__title-input" 
                    autoComplete="off" 
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea 
                    placeholder="what happend today" 
                    className="notes__text-area" 
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                />
                    
                <div className="notes__images">
                    <img src={note.url} alt="imagen"/>
                </div>
            </div>

        <button 
            className="btn btn-danger"
            onClick={handleDelete}
        >
            Delete
        </button>


        </div>
    )
}
