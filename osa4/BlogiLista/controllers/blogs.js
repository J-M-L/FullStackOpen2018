const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/* old
const formatBlog = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog._id
    }
}
*/ 

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
    response.json(blogs.map(Blog.format))

})


blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if(body.title === undefined || body.url === undefined){
          return response.status(400).json({error: 'title missing'})
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes || 0,
          user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(Blog.format(savedBlog))
    } catch (exception) {
        if(exception.name === 'JsonWebTokenError') {
            response.status(401).send({error : exception.message})
        } else {
            console.log(exception)
            response.status(500).json({error: 'something went wrong.!.'})
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const tokenUser = decodedToken.id
        const blog = await Blog.findById(request.params.id)

        if(!blog.user){
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }
        else if ( blog.user.toString() === tokenUser.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }

        return response.status(401).json({ error: 'token missing or invalid' })        

    } catch (exception) {
        console.log(exception)
        response.status(400).send({error : 'malformatted id'})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(Blog.format(updatedBlog))
    } catch (error) {
        console.log(error)
        response.status(400).send({error: 'malformatted id'})
    }
})


module.exports = blogsRouter