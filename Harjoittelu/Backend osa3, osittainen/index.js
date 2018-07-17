const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Note = require('./models/note')

const url = 'mongodb://fullstack:theamazingandwonderfulpartofdb1@ds131711.mlab.com:31711/fullstacktestdbjml'

app.use(cors())

const formatNote = (note) => {
  return{
    content : note.content,
    date: note.date,
    important: note.important,
    id: note._id
  }
}

const logger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.method)
  console.log('Body:', req.path)
  console.log('----:', req.body)  
  next()
}

app.use(bodyParser.json())
app.use(logger)

app.get('/', (req,res) => {
  res.send('<h1>Hello keijo</h1>')
})

app.get('/api/notes', (req, res) => {
  Note
    .find({})
    .then(notes => {
      res.json(notes.map(formatNote))
    })
})

app.get('/api/notes/:id', (req, res) => {
  Note
    .findById(req.params.id)
    .then(note =>{
      if(note){
        res.json(formatNote(note))
      }
      else{
        res.status(404).end()
      }      
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({error: 'malformatted id'})
    })
})

app.delete('/api/notes/:id', (req, res) => {
  Note
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(400).send({error : 'malformatted id'})
    })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important|| false,
    date: new Date()
  })

  note
    .save()
    .then(formatNote)
    .then(savedAndFormattedNote => {
      response.json(formatNote(savedAndFormattedNote))
    })
})

app.put('/api/notes/:id', (req, res) => {
  const body = req.body

  const note = {
    content:body.content,
    important: body.important
  }

  Note
    .findByIdAndUpdate(req.params.id, note, {new : true})
    .then(updatedNote => {
      res.json(formatNote(updatedNote))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({error: 'malformatted id'})
    })
})

const error = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})