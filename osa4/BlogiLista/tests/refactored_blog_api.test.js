const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, format, nonExistingId, blogsInDb, createNewBlogAndReturnId } = require('./test_helpers')

//Käytän osittain samoja testiselostuksia, koska ovat ihan hyvin kuvaavia
describe('when there is initially some blogs saved in database', async () => {
    beforeAll(async () => {
        await Blog.remove()

        const blogs = initialBlogs.map(b => new Blog(b))
        await Promise.all(blogs.map(b => b.save()))
    }) 

    test('all blogs returned in json format by GET /api/blogs', async () => {
        await api
                .get('/api/blogs')
                .expect(200)
                .expect("Content-Type", /application\/json/)        
    })

    test('all blogs are returned as json by Get /api/blogs', async () => {
        const blogsInDatabase = await blogsInDb()
        expect(blogsInDatabase.length).toBe(initialBlogs.length)
    })

    test('returned blog content is correct by Get /api/blogs', async () => {
        const blogsInDatabase = await blogsInDb()
    
        const titles = blogsInDatabase.map(b => b.title)

        initialBlogs.forEach(blog => {
            expect(titles).toContain(blog.title)
        })
    })

    describe('adding of a new blog', async () => {
        test('POST /api/blogs succeeds with valid data', async () => {
            const blogsAtStart = await blogsInDb()
      
            const newBlog = {
              title: 'testblog, valid post',
              author: 'koodari x',
              url: 'www.testisivu.fi/213',
              likes: 1247
            }
      
            await api
              .post('/api/blogs')
              .send(newBlog)
              .expect(201)
              .expect('Content-Type', /application\/json/)
      
            const blogsAfterOperation = await blogsInDb()
      
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
      
            const contents = blogsAfterOperation.map(r => r.title)
            expect(contents).toContain('testblog, valid post')
          })

        test('POST /api/blogs fails, no title added return 400', async () => {
            const blogsAtStart = await blogsInDb()
            const newBlog = {
              author: "should not be added",
              url: "www.notarealwebsite.fake",
              like: 1
            }
          
            await api
              .post('/api/blogs')
              .send(newBlog)
              .expect(400)
          
            const blogsAfterOperation = await blogsInDb()
          
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
        })

        test('POST /api/blogs fails, no url added return 400', async () => {
            const blogsAtStart = await blogsInDb()
            const newBlog = {
              title: "no url blog",
              author: "should not be added",
              like: 1
            }
          
            await api
              .post('/api/blogs')
              .send(newBlog)
              .expect(400)
          
            const blogsAfterOperation = await blogsInDb()
          
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
        })

        test('POST /api/blogs, no likes given, should be set to 0', async () => {
            const blogsAtStart = await blogsInDb()
            const newBlog = {
              title: 'likes to zero test',
              author: "should not be added",
              url: "www.notarealwebsite.fake"
            }
    
            await api
              .post('/api/blogs')
              .send(newBlog)
          
            const blogsAfterOperation = await blogsInDb()

            expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)    
            blogsAfterOperation.map(b => expect(Number.isInteger(b.likes)).toBe(true))
        })  
    })
    
    
    afterAll(() => {
        server.close()
    })
})