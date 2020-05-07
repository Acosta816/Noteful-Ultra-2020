import React from 'react';



class NotePageNav extends React.Component {
    static defaultProps = {
        folder: {
            name: ""
        }
    }

    render() {

        return(
            <div className="NotePageNav">
                <button type="button" role="link" onClick={()=> {this.props.history.goBack()}}>Back</button>
                {this.props.folder.name}
            </div>
        )
    }
}

export default NotePageNav;