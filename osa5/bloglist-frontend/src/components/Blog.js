import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false
    }
  }

  static propTypes = {
    blog: PropTypes.object.isRequired    
  }

  toggleShowInfo = () => {
    this.setState({ showInfo: !this.state.showInfo })
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

    let deletebuttonVisibility = { display: 'none'}
    if(!this.props.blog.user){
      deletebuttonVisibility = { display: ''}
    }
    else if(this.props.blog.user){
      deletebuttonVisibility = { display: this.props.username !== this.props.blog.user.username ? 'none' : '' }
    }

    let blogCreator = 'unknown'
    if(this.props.blog.user){
      blogCreator = this.props.blog.user.name
    }

    return(
      <div style={blogStyle}>
        <div style={hideInfo} onClick={this.toggleShowInfo} className="blogSmallInfo">
          {this.props.blog.title} {this.props.blog.author}
        </div>

        <div style={showInfo} onClick={this.toggleShowInfo} className="blogBigInfo">
          {this.props.blog.title} {this.props.blog.author}
          <div style={infoStyle}>          
            <a href= {this.props.blog.url}>{this.props.blog.url}</a> <br/>
            <a>{this.props.blog.likes} likes  
              <button id={this.props.blog.title} onClick={this.props.handleLike}>like</button>
            </a> <br/>
            <a>added by {blogCreator}</a> <br/>
            <button id={this.props.blog.title} style={deletebuttonVisibility} onClick={this.props.handleDelete}>delete</button>
          </div>


        </div>
      </div>
      



    )
  }

    
}

export default Blog