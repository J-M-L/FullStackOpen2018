import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {
  it('renders content', () => {
    const testBlog ={
      title: 'testi Title',
      author: 'testi Author',
      likes: 20
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={testBlog}/>)
    const blogInfo = simpleBlogComponent.find('.blogInfo')
    const blogLikes = simpleBlogComponent.find('.blogLikes')

    expect(blogInfo.text()).toContain(`${testBlog.title} ${testBlog.author}`)
    expect(blogLikes.text()).toContain(`blog has ${testBlog.likes} likes`)


  })
  it('clicking the button calls event twice when double cliked', () => {
    const testBlog ={
      title: 'testi Title',
      author: 'testi Author',
      likes: 20
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={testBlog} onClick={mockHandler}/>)

    const button = simpleBlogComponent.find('.blogLikes').find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)

  })
})