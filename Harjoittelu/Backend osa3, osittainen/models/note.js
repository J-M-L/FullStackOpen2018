const mongoose = require('mongoose')

const url = 'mongodb://fullstack:theamazingandwonderfulpartofdb1@ds131711.mlab.com:31711/fullstacktestdbjml'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Note