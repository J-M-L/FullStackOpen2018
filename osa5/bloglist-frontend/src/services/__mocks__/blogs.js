let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "mies",
    likes: 11,
    url: "jokusivu@joku.com",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8cw",
    title: "HTML on helppoa 2",
    author: "Henkilö",
    likes: 69,
    url: "jokusivu2@joku2.com",
    user: {
      _id: "5a437a9e514ab7f168ddf135",
      username: "Jokutoinen",
      name: "Kekkonen"
    }
  },  
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs, setToken }