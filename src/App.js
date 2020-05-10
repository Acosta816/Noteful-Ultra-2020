import React from 'react';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom';
import './App.css';
import ghost from './config';
import FolderNav from './FolderNav/FolderNav';
import NoteLinks from './NoteLinks/NoteLInks';
import NotePage from './NotePage/NotePage';
import NotePageNav from './NotePageNav/NotePageNav';
import NotefulContext from './NotefulContext';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    }
  }



  componentDidMount() {

	this.fetchNotesAndFolders();
  }

  fetchNotesAndFolders = ()=> {
	const { foldersUrl, notesUrl } = ghost;

	this.fetchResources(notesUrl,"notes");
	this.fetchResources(foldersUrl,"folders");
  }

  //This function fetches the notes and folders arrays and sets state. You should use this to force a rerender after adding or deleting any new notes and folders
  fetchResources = (url,stateKey)=> {
	//set up the options  
	const options = {
		method: "GET",
		headers: {
			'content-type': 'application/json',
		}
	}

	//fetch the resourses at the endpoint passed in (url) and setState at the key passed in (stateKey)
	fetch(url, options)
	.then(res => {
		if (!res.ok) {
		  // get the error message from the response,
		  return res.json().then(error => {
			// then throw it
			throw error
		  })
		}
		return res.json()
	  })
	  .then(data=> {
		  this.setState({
			  [stateKey]: data
		  })
	  })
	  
	  
  } //END of fetchResources()

  deleteNote = (noteId)=> {
	console.log(this.props);

	this.props.history.push("/") //Send us back to main list view because the current route wont exist anymore if deleting on NotePage. (in order to access history routeprop, we needed to export withRouter(App) )

	console.log(noteId);
	const { notesUrl } = ghost;
	const url = `${notesUrl}/${noteId}`;
	const options = {
		method: "DELETE",
		headers: {
			'content-type': 'application/json',
		  }
	}
	//now we fetch (delete) the note
	fetch(url,options)
	.then(res => {
		if (!res.ok) {
		  throw new Error(res.status)
		}
		return res.json()
	  })
	  .then(data=> {
		  console.log(data);
		  this.fetchNotesAndFolders();
	  })
	

	

  } //=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-END OF deleteNote()-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=


  renderNavRoutes = ()=> {
	  //render the different sidebar navigation views for all paths...
	  
	  const folderNavRoutes = ['/', '/folder/:folderId'].map(path=> {
		  return(
			  <Route exact path={path} key={path} component={FolderNav} />
		  )
	  });


	  return(
		  <>
		  	{folderNavRoutes}

			  <Route path='/note/:noteId' render={routeProps => {
				  const thisNote = this.state.notes.find(note=> note.id === routeProps.match.params.noteId);
				  const thisfolder = this.state.folders.find(folder=> folder.id === thisNote.folderId);
				  return (
					  <NotePageNav {...routeProps} folder={thisfolder} />
				  )
			  }} />

				<Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
			
		  </>
	  )
  } //-----------------------------------end of renderNavRoutes

  renderNoteLinks = ()=> {
	  //render the main page notes links and the filtered ones. (rendering only the links for the notes);
	  const noteLinks = ['/', '/folder/:folderId'].map((path,index)=> {
		  return(
			  <Route exact path={path} key={path} render={(routeProps)=> {
				  //pass in filtered notes depending on the folder... if there is no folderId param (as is the case for '/' path) then just pass in all notes, else, filter notes using the appropriate folderId
				  let thisFolderNotes;
				  (!routeProps.match.params.folderId) ? thisFolderNotes = this.state.notes : thisFolderNotes = this.state.notes.filter(note=> note.folderId === routeProps.match.params.folderId);
				  console.log(thisFolderNotes);

				  return(
					<NoteLinks notes={thisFolderNotes} {...routeProps} />
				  )
			  }} />
		  )
	  }); //----------end of noteLinks


	  return noteLinks


  } //End of renderNoteLinks

  renderNotePageMain = ()=> {
	  return (
		  <Route path={'/note/:noteId'} component={NotePage} />
	  )
  }



  


  render() {


//================================================CONTEXT BASKET========================================================================================================
	const contextValue = {
		folders: this.state.folders,
		notes: this.state.notes,
		deleteNote: this.deleteNote,
	}
//================================================CONTEXT BASKET========================================================================================================
	console.log(contextValue);

    return(
		<NotefulContext.Provider value={contextValue}>
			<div className="App">
				<nav className="App__nav">
				{this.renderNavRoutes()}
				</nav>

				<header className="App__header">
					<h1>
						<Link to="/">Noteful</Link>{' '}
					</h1>
				</header>

				<main className="App__main">
					{this.renderNoteLinks()}
					{this.renderNotePageMain()}
				</main>

      </div>
		</NotefulContext.Provider>

    )
  }
}

export default withRouter(App);