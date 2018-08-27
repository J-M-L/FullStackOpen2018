import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable';

describe('<App />', () => {
    let app
  
    describe('when user is not logged', () => {
      beforeEach(() => {
        app= mount(<App />)
      })
  
      it('only login form is rendered', () => {
        app.update()

        const togglableComponent = app.find(Togglable)
        expect(togglableComponent.text()).toContain('loginLog in to applicationusername:password:logincancel')
      })
    })
  
    describe('when user is logged', () => {
      beforeEach(() => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
          }
          
        localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        
        app= mount(<App />)
      })
  
      it('all notes are rendered', () => {
        app.update()
        

        const blogs = app.find(BlogForm).find(Blog)
        expect(blogs.lenght).toBe(blogService.blogs.lenght)        
      })
    })
  })
