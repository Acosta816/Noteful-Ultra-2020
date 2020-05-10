import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FolderNav.css';
import NotefulContext from '../NotefulContext';


//FolderNav.js = NoteListNav.js
class FolderNav extends React.Component {

    static contextType = NotefulContext;



    renderFolderLinks = ()=> {
        const {folders, notes } = this.context;

        const folderLinks = folders.map(folder=> {
            const thisFolder = notes.filter(note=> note.folderId === folder.id);
            console.log(thisFolder.length);
            return(
                <li key={folder.id}>
                    <NavLink activeClassName="currentFolder" className="FolderNav__folder-link" to={`/folder/${folder.id}`}>
                        <span>({thisFolder.length})</span>
                        {" "}
                        {folder.name}
                    </NavLink>
                </li>
            )
        });
        return folderLinks;
    }

    render() {

        return(
            <div className="FolderNav">
                <ul className="FolderNav_list">
                    {this.renderFolderLinks()}
                </ul>

                <Link to="/add-folder">Add Folder+</Link>


            </div>
        )
    }
}


export default FolderNav;