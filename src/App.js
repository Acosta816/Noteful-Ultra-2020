import React from 'react';
import { Route, NavLink, Link, Switch } from 'react-router-dom';
import store from './store';
import FolderNav from './FolderNav/FolderNav';
import NoteLinks from './NoteLinks/NoteLInks';
import NotePage from './NotePage/NotePage';
import NotePageNav from './NotePageNav/NotePageNav';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    }
  }

  componentDidMount() {

    this.setState(store);
  }

  renderNavRoutes = ()=> {
	  //render the different sidebar navigation views for all paths...
	  const { notes, folders } = this.state;
	  const folderNavRoutes = ['/', '/folder/:folderId'].map(path=> {
		  return(
			  <Route exact path={path} key={path} render={routeProps => {
				  return (
					  <FolderNav  folders={folders} notes={notes} {...routeProps} />      //{...routeProps} is just a shorthand for including the routeProps in there the same way we would using withRouter()
				  )
			  }} />
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
		  <Route path={'/note/:noteId'} render={routeProps=> {
			  return(
				  <NotePage notes={this.state.notes} {...routeProps} />
			  )
		  }} />
	  )
  }




  render() {
    console.log(this.state);
    return(
      <div className="App">
        <nav className="App__nav">
          {this.renderNavRoutes()}
        </nav>

        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link>{' '}
            {/* insert fontawesome icon in here for doubleCheck logo (purely aesthetic) */}
          </h1>
        </header>

        <main className="App__main">
			{this.renderNoteLinks()}
			{this.renderNotePageMain()}
		</main>

      </div>
    )
  }
}

export default App;