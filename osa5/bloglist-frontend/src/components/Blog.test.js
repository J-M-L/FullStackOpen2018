import React from 'react'
import {shallow, mount} from 'enzyme'
import Blog from './Blog'
import Togglable from './Togglable'


describe('<Blog/>', () => {
    it('renders basic content', () => {
        const testBlog ={
            title: 'testi Title',
            author: 'testi Author'
        }
        const blogComponent = shallow(<Blog blog={testBlog}/>)
        const blogInfo = blogComponent.find('.blogSmallInfo')
        
        expect(blogInfo.text()).toContain(`${testBlog.title} ${testBlog.author}`)
    })

    it('renders larger content after mouseclick', () => {
        const testBlog ={
            title: 'testi Title',
            author: 'testi Author',
            likes: 11,
            url: 'testUrl'
        }
        const blogComponent = shallow(<Blog blog={testBlog}/>)
        const blogSmallInfo = blogComponent.find('.blogSmallInfo')
        blogSmallInfo.simulate('click')
        const blogBigInfo = blogComponent.find('.blogBigInfo')

        console.log(blogBigInfo.text())

        const expectedResult = `${testBlog.title} ${testBlog.author}${testBlog.url} ${testBlog.likes}`

        expect(blogBigInfo.text()).toContain(expectedResult)
    })
})

