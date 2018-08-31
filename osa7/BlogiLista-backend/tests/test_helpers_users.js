const User = require('../models/user')

const initialUser = [
    {
        username: "testUser",
        name: "NameTetst",
        adult: false,
        password: "test"
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(User.format)
}

module.exports = {
    initialUser, usersInDb
}