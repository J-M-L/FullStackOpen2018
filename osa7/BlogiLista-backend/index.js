const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')


mongoose.connect(config.mongoUrl, {useNewUrlParser: true})
mongoose.Promise = global.Promise

/*  old
mongoose
    .connect(config.mongoUrl, { useNewUrlParser: true })
    .then( () => {
        console.log('connected to database')
    })
    .catch( err => {
        console.log(err)
    })
*/


app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port} `)
})

server.on('close', () => {
    mongoose.connection.close()
    mongoose.disconnect()
})

module.exports = {app, server}