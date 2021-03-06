import React from 'react';
import Tietosyotto from './components/Tietosyotto'
import LisaaUusiHenkilo from './components/LisaaUusiHenkilo'
import Puhelinluettelo from './components/PuhelinLuettelo'
import ContactsService from './services/contactsService'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount(){
    ContactsService.getAll()
      .then(response => {
        this.setState({persons: response})
      })
  }

  ButtonClick = (event) => {
    event.preventDefault()    
    if(!this.state.persons.some(item => item.name === this.state.newName)){    

        const newObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        ContactsService.create(newObject)
          .then(response => {
            this.setState({persons: this.state.persons.concat(response) })
          })
    }
    else{
        alert('Kyseinen nimi on jo listalla!!!')
    }
  }

  handleChange = (event) => {
    let change = {}
    change[event.target.name] = event.target.value

    this.setState(change)      
  }

  deletePerson = (event) => {
    const targetID = parseInt(event.target.id, 10)
    const allPersons = this.state.persons
    const personToBeRemoved = allPersons.find(p => p.id === targetID)
        
    const remove = window.confirm(`poistetaanko ${personToBeRemoved.name}`);
    
    if(remove){
      ContactsService.deleteContact(personToBeRemoved.id)
        .then(response => {
          const personsList = this.state.persons.filter(p => p.id !== targetID)
          this.setState({
            persons: personsList
          })
        })
    }
  }

  render() {
      const filteredNames = this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()))
    return (
      <div>
        <h1>Puhelinluettelo</h1>

        <Tietosyotto text = "rajaa näytettäviä:" name = "filter" value = {this.state.filter} handleChange={this.handleChange} />

        <LisaaUusiHenkilo  newName="newName" nameValue={this.state.newName}
                           newNumber="newNumber" numberValue={this.state.newNumber} handleChange={this.handleChange}
                           buttonClick ={this.ButtonClick}
        />
        
        <h2>Numerot</h2>
        
        <Puhelinluettelo list ={filteredNames} deleteContact={this.deletePerson} />
        
      </div>
    )
  }
}

export default App