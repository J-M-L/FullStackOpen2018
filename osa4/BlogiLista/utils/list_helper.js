const dummy = (blogs) => {
    return(1)
  }

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total += blog.likes
    })

    return total
}

const favoriteBlog = (blogs) => {
    const returnObj = (blog)=> {
        return{
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        }
    }

    let maxLikes = 0
    blogs.forEach(blog => {
        if(blog.likes > maxLikes){
            maxLikes = blog.likes
        }
    })
    
    return returnObj(blogs.find(blog => blog.likes === maxLikes))
}

const mostBlogs = (blogs) => {
    let dict = {}
    
    blogs.forEach(blog => {
        if(!(blog.author in dict)){
            dict[blog.author] = 0
        }
        dict[blog.author] += 1
    })

    let highestBlogCount = 0
    let highestName = ""
    
    for(let key in dict){
        if(dict[key] > highestBlogCount){
            highestName = key
            highestBlogCount = dict[key]
        }
    }

    return {author: highestName, blogs: highestBlogCount}
}

const mostLikes = (blogs) => {
    let dict = {}
    
    blogs.forEach(blog => {
        if(!(blog.author in dict)){
            dict[blog.author] = 0
        }
        dict[blog.author] += blog.likes
    })

    let highestLikeCount = 0
    let highestName = ""
    
    for(let key in dict){
        if(dict[key] > highestLikeCount){
            highestName = key
            highestLikeCount = dict[key]
        }
    }

    return {author: highestName, likes: highestLikeCount}
}








module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}