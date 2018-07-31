const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/user')
const initialUser = require('./test_helpers_users').initialUser
const usersInDb = require('./test_helpers_users').usersInDb



describe('when there is initially some users saved', async () => {
    beforeAll(async () => {
      await User.remove({})
  
      const userObjects = initialUser.map(u => new User(u))
      await Promise.all(userObjects.map(u => u.save()))
    })
  
    test('all notes are returned as json by GET /api/notes', async () => {
      const usersInDatabase = await usersInDb()
  
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      expect(response.body.length).toBe(usersInDatabase.length)
  
      const returnedUsernames = response.body.map(u => u.username)
      usersInDatabase.forEach(user => {
        expect(returnedUsernames).toContain(user.username)
      })
    })
  
    describe('addition of a new user', async () => {
        test('POST /api/user succeeds with valid data', async () => {
          const usersAtStart = await usersInDb()
    
          const newUser = {
            username: "newUser1",
            name: "newName1",
            adult: false,
            password: "test1"        
          }
    
          await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
          const usersAfterOperation = await usersInDb()
    
          expect(usersAfterOperation.length).toBe(usersAtStart.length + 1)
    
          const usernames = usersAfterOperation.map(r => r.username)
          expect(usernames).toContain('newUser1')
        })
        test('POST /api/user fails, password too short', async () => {
          const usersAtStart = await usersInDb()
    
          const newUser = {
            username: "newUser1",
            name: "newName1",
            adult: false,
            password: "te"        
          }
    
          const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
          const usersAfterOperation = await usersInDb()
    
          expect(usersAfterOperation.length).toBe(usersAtStart.length)  
          
          expect(result.body.error).toBe('password must be at least 3 marks')
        })
        test('POST /api/user fails, not unique username', async () => {
          const usersAtStart = await usersInDb()
    
          const newUser = {
            username: usersAtStart[0].username,
            name: "newName1",
            adult: false,
            password: "teteste"        
          }
    
          const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
          const usersAfterOperation = await usersInDb()
    
          expect(usersAfterOperation.length).toBe(usersAtStart.length)  
          
          expect(result.body.error).toBe('username must be unique')
        })
        test('POST /api/user succeeds, adult field empty, should be added as true', async () => {
          const usersAtStart = await usersInDb()
    
          const newUser = {
            username: "newUser2",
            name: "newName1",
            password: "teteste"        
          }
    
          const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
          const usersAfterOperation = await usersInDb()
    
          expect(usersAfterOperation.length).toBe(usersAtStart.length + 1)  
          
          const addedUser = usersAfterOperation.filter(u => u.username === "newUser2")

          expect(addedUser[0].adult).toBe(true)
        })
    })  
})

afterAll(() => {
  server.close()
})