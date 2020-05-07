import React from 'react';
import Note from '../Note/Note';



class NotePage extends React.Component {
    static defaultProps= {
        note: {content: ""}
    }

    render() {
        
        console.log(this.props.match.params.noteId);
        const thisNote = this.props.notes.find(note=> note.id === this.props.match.params.noteId);
        console.log(thisNote);
        console.log(this.props)
        return(
            <section className="NotePage">
                <Note id={thisNote.id} note={thisNote} />

                <div className="NotePage__content">
                    {thisNote.content.split(/\n \r|\n/).map((para,index)=> {
                        return <p key={index}>{para}</p>
                    })}
                </div>

            </section>
        )
    }
}

export default NotePage;