import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';


class Note extends React.Component {
    render() {

        return(
            <div className="Note">


                <h2 className='Note__title'>
                    <Link to={`/note/${this.props.note.id}`}>{this.props.note.name}</Link>
                </h2>

                <button className="Note__delete" type="button">
                    remove
                </button>

                <div className="Note__dates">
                    <div className='Note__dates-modified'>
                        Modified
                        <span className="Date">{this.props.note.modified}</span>
                    </div>
                </div>


            </div>
        )
    }
}

export default Note;