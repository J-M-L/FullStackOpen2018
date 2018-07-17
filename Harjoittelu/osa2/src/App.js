import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/notification'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      notes: [],
      newNote : 'uusi muistiinpano...',
      showAll: true,
      error : null
    }
    console.log('constructor')
  }

  componentDidMount(){
    noteService
      .getAll()
      .then(response => {
        this.setState({notes: response})  
      })    
  }

  addNote = (event) => {
    event.preventDefault()
    const newObject = {
      content: this.state.newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5
    }

    noteService
      .create(newObject)
      .then(note => {
        this.setState({
          notes: this.state.notes.concat({note}),
          newNote : ''
        })
      })
  }

  toggleImportanceOf = (id) => {
    return () => {
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote)
        .then(updatedNote => {
          const notes = this.state.notes.filter(note => note.id !== id)
          this.setState({
            notes: notes.concat(updatedNote)
          })
        })
        .catch(error => {
          this.setState({
            error:`muistiinpano ${note.content} on jo valitettavasti poistettu palvelimelta`,
            notes: this.state.notes.filter(n => n.id !== id)
          })
          setTimeout(() => {
            this.setState({error:null})
          }, 5000);
        })
    }
  }

  handeNoteChange = (event) => {
    this.setState({newNote : event.target.value})
  }

  toggleVisible = () => {
    this.setState({showAll : !this.state.showAll})
  }

  render(){
    const notesToShow = 
      this.state.showAll ? 
        this.state.notes : 
        this.state.notes.filter(note => note.important)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return(
      <div>
        <h1>Muistiinpanot</h1>

        <Notification message = {this.state.error} />

        <div>
          <button onClick={this.toggleVisible}>Näytä {label}</button>
        </div>

        <ul>
          {notesToShow.map(note => <Note key={note.id} note= {note} toggleImportance={this.toggleImportanceOf(note.id)} />)}
        </ul>
        <form onSubmit={this.addNote}>
          <input 
            value={this.state.newNote}
            onChange={this.handeNoteChange}  
          />
          <button type ="submit">Tallenna</button>
        </form>
      </div>
    )
  }
}

export default App