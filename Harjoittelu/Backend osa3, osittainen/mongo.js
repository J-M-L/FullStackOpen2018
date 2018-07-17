const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://fullstack:theamazingandwonderfulpartofdb1@ds131711.mlab.com:31711/fullstacktestdbjml'

mongoose.connect(url, {useNewUrlParser : true})

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
  date: new Date(),
  important: true
})

/*
note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
 Note
 .find({})
 .then(result => {
   result.forEach(note => {
     console.log(note)
   })
   mongoose.connection.close()
 })
