import React from 'react';
import { NavLink } from 'react-router-dom';
import Note from '../Note/Note';


//export the navlinks to the note.js where they will be part of the note div component and instead map over the notes prop to render <li>s with <Note>s inside them
class NoteLinks extends React.Component {
    static defaultProps = {
        notes: []
    }

    renderNoteLinks = ()=> {
        const noteLinks = this.props.notes.map((note,index)=> {
            return(
                <li key={note.id}>
                    <Note note={note} />
                </li>
            )
        });
        
        return noteLinks;
    }

    render() {
        console.log(this.props);

        return(
            <section className="NoteLinks">

                <ul>
                    {this.renderNoteLinks()}
                </ul>
                
                <NavLink to={'/add-note'}>+ Note</NavLink>
                

            </section>
        )
    }
}


export default NoteLinks;