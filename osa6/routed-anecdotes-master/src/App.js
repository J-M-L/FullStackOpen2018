import React from 'react'
import { BrowserRouter as Router,  Route, Link } from 'react-router-dom'
import { Container, Table, Form, Button, Message, Menu, Card, Grid } from 'semantic-ui-react'

/* Stylet olivat käytössä,  
const menuStyle = {
  background: 'lightblue'
}

const navLinkStyle ={
  color: 'black',
  textDecoration: 'none'
  
}

const notificationStyle = {
  borderStyle: 'solid',
  marginTop: 'auto',
  padding: '10px',
  borderColor: 'green',
  borderRadius: '25px'

}
*/
const MenuBar = () => (
  <Menu inverted>
    <Menu.Item link>
      <Link to="/">anocdotes</Link>
    </Menu.Item>
    <Menu.Item link>
      <Link to="/create">create new</Link>
    </Menu.Item>
    <Menu.Item link>
      <Link to="/about">about</Link>
    </Menu.Item>
  </Menu>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <Table.Body>
        {anecdotes.map(anecdote => 
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <div>
    <Grid columns='equal'>
      <Grid.Column>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column>
        <Card image="https://avatars1.githubusercontent.com/u/523235?s=400&v=4"></Card>
      </Grid.Column>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input 
              name='content'
              value={this.state.content} 
              onChange={this.handleChange}/>
          </Form.Field>
          
          <Form.Field>
            <label>author</label>
            <input 
              name='author'
              value={this.state.author} 
              onChange={this.handleChange}/>
          </Form.Field>
          
          <Form.Field>
            <label>url for more info</label>
            <input 
              name='info'
              value={this.state.info} 
              onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>create</Button>
        </Form>
      </div>  
    )

  }
}

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more information see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    })
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <MenuBar />

              {(this.state.notification && <Message success>{this.state.notification}</Message>)}

              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>} />
              <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>} />
              <Route exact path="/anecdotes/:id" render={({match}) => 
                <Anecdote anecdote={this.anecdoteById(match.params.id)}/>} />              
              
              <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
              <Route path="/about" render={() => <About/>} />
              <Footer />
            </div>
        </Router>
      </Container>
    );
  }
}

export default App;
