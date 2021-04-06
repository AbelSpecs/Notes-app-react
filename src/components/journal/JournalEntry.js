import React from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id,date, title, body, url}) => {

    const noteDate = moment(date);

    const dispatch = useDispatch();
    
    const handleClick = () => {

        const Note = {
            title: title,
            body: body,
            date: date,
            url: url
        }

        dispatch(activeNote(id, Note))
    }

    return (
        <div className="journal__entry pointer" onClick={handleClick}>

            {
                url &&
                    (<div 
                        className="journal__entry-picture" 
                        style={{backgroundSize: 'cover', backgroundImage: `url(${url})`}}>

                    </div>)
            }

            <div className="journal__entry-body">
                <p className="journal__entrie-title">
                   {title}
                </p>
                <p className="journal__entrie-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('MMMM Do YYYY')}</h4>
            </div>
        </div>
    )
}
