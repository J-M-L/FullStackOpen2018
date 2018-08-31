const mongoose = require('mongoose')
const Blog = require('./models/blog')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
mongoose.Promise = global.Promise

const args = process.argv.slice(2)
const newTitle = args[0]
const newAuthor = args[1]
const newUrl = args[2]
const newLikes = args[3]

if(newTitle && newAuthor && newUrl && newLikes){
    const blog = new Blog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: newLikes
    })

    console.log(`lisätään blogi ${newAuthor} luoma blogi ${newTitle} luetteloon`)

    blog
        .save()
        .then(response => {
            console.log('tallennus onnistui')
            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
}
else if(newTitle || newAuthor || newUrl || newLikes){
    console.log('syötä kaikki tarvittavat tiedot! Nimi, kirjoittaja, osoite ja tykkäykset')
    mongoose.connection.close()
}
else{
    Blog
        .find({})
        .then(result => {
            console.log('blogit')
            result.forEach(i => {
                console.log(`nimi:${i.title}, kirjoittaja:${i.author}, url:${i.url}, tykkäykset:${i.likes}`)
            })
            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
}

