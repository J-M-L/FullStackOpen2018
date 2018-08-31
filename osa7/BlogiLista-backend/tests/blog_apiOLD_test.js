const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')


beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
})

describe('Get request', () => {
    test('blogs are returned, correct format', async () => {
        await api
                .get('/api/blogs')
                .expect(200)
                .expect("Content-Type", /application\/json/)
    })
    
    test('blogs are returned, correct length', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body.length).toBe(initialBlogs.length)
    })
    
    test('blogs are returned, a specific note is within the returned notes', async () => {
        const response = await api.get('/api/blogs')
    
        const contents = response.body.map(i => i.title)
        
        expect(contents).toContain('Go To Statement Considered Harmful')
    })
})

describe('Post method', () => {
    test('blogs are posted, a valid blog can be added', async () => {
        const newBlog = {
            title: 'new Blog, post test',
            author: 'new Author',
            url: 'http://testurl.com/a213',
            likes: 2004
        }
              
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')
      
        const contents = response.body.map(r => r.title)
      
        expect(response.body.length).toBe(initialBlogs.length + 1)
        expect(contents).toContain('new Blog, post test')
    })
    
    test('blogs are posted, note without title is not added', async () => {
        const newBlog = {
          author: "should not be added",
          url: "www.notarealwebsite.fake",
          like: 1
        }
      
        const initialBlogs = await api
          .get('/api/blogs')
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const response = await api.get('/api/blogs')
      
        expect(response.body.length).toBe(initialBlogs.body.length)
    })

    test('blogs are posted, note without url is not added', async () => {
        const newBlog = {
          title: "no url blog",
          author: "should not be added",
          like: 1
        }
      
        const initialBlogs = await api
          .get('/api/blogs')
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const response = await api.get('/api/blogs')
      
        expect(response.body.length).toBe(initialBlogs.body.length)
    })

    test('blogs are posted, likes not set, should be set to 0', async () => {
        const newBlog = {
          title: 'likes to zero test',
          author: "should not be added",
          url: "www.notarealwebsite.fake"
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
      
        const response = await api.get('/api/blogs')

        response.body.map(b => expect(Number.isInteger(b.likes)).toBe(true))
    })  
    
    afterAll(() => {
      server.close()
  })
})




const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
