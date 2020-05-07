import React from 'react';
import { NavLink, Link } from 'react-router-dom';



//FolderNav.js = NoteListNav.js
class FolderNav extends React.Component {

    renderFolderLinks = ()=> {
        const folderLinks = this.props.folders.map(folder=> {
            const thisFolder = this.props.notes.filter(note=> note.folderId === folder.id);
            console.log(thisFolder.length);
            return(
                <li key={folder.id}>
                    <NavLink activeClassName="currentFolder" className="FolderNav__folder-link" to={`/folder/${folder.id}`}>
                        <span>{thisFolder.length}</span>
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