import Swal from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import {types} from '../types/types';

//react-journal

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            url: ''
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        
        dispatch(activeNote(doc.id, newNote));
        dispatch(loadNewNote(doc.id, newNote));
        
    }   
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const loadNewNote = (id ,note) => ({
    type: types.notesAddNew,
    payload: {id, ...note}
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes)); 
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        console.log(note);
        const {uid} = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteFirestore = {...note};
        delete noteFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteFirestore);

        dispatch(refreshNote(note.id, note));
        Swal.fire('Saved', note.title, 'success');
        
    }
}

export const refreshNote = (id, note) => ({
    
    type: types.notesUpdated,
    payload:{
        id,
        note: {...note}
    }
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active:nota } = getState().notes;

        const fileUrl = await fileUpload(file);
        nota.url = fileUrl;

        dispatch(startSaveNote(nota));
        

        console.log(fileUrl);
    }
}

export const startDelete = (id) => {
    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        console.log("antes de la peticion");
        try {
            await db.doc(`${uid}/journal/notes/${id}`).delete();
            
        } catch (error) {
            console.log(error);
        }
        console.log("desps de la peticion");
        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) =>({
    type: types.notesDelete,
    payload: id
})

export const notesLogout = () => ({
    type: types.notesLogoutCleaning
})