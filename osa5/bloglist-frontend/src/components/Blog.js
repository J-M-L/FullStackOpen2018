import React from 'react'

class Blog extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false
    }
  }

  toggleShowInfo = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  likeButton = (event) => {
    event.preventDefault()
  }

  render(){
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const infoStyle = {
      paddingLeft: "10px"      
    }
    const hideInfo = { display: this.state.showInfo ? 'none' : '' }
    const showInfo = { display: this.state.showInfo ? '' : 'none' }

    let blogCreator = 'unknown'
    if(this.props.blog.user){
      blogCreator = this.props.blog.user.name
    }

    return(
      <div style={blogStyle}>
        <div style={hideInfo} onClick={this.toggleShowInfo}>
          {this.props.blog.title} {this.props.blog.author}
        </div>

        <div style={showInfo} onClick={this.toggleShowInfo}>
          {this.props.blog.title} {this.props.blog.author}
          <div style={infoStyle}>          
            <a href= {this.props.blog.url}>{this.props.blog.url}</a> <br/>
            <a>{this.props.blog.likes} likes  
              <button onClick={this.likeButton}>like</button>
            </a> <br/>
            <a>added by {blogCreator}</a>
          </div>


        </div>
      </div>
      



    )
  }

    
}
  




export default Blog