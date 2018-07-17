const User = require('../models/user')
const { format, initialNotes, nonExistingId, notesInDb, usersInDb } = require('./test_helper')


describe.only('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })
  
    test('POST /api/users succeeds with a fresh username', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
      const usernames = usersAfterOperation.map(u=>u.username)
      expect(usernames).toContain(newUser.username)
    })

    afterAll(() => {
        server.close()
    })

})


  