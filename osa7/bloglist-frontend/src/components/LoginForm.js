import React from 'react'
import ImputField from './InputField'
import Button from './Button'
import { connect } from 'react-redux'
import { changeUsername, changePassword, changeUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import loginService from '../services/login'
import Togglable from './Togglable'

const login = async (event, props) => {
    event.preventDefault()
    const loginUsername = props.userInfo.username
    const loginPassword = props.userInfo.password
    event.target.username.value = ''
    event.target.password.value = ''
    
    console.log(`logging with username:'${loginUsername}' and password: ${loginPassword}`)
    try{
      const user = await loginService.login({
        username: loginUsername,
        password: loginPassword
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
      props.changeUser(user) 

    }catch(exception) {
      props.notify('käyttäjätunnus tai salasana virheellinen')
    }
}

const handleChange = (event, dispatcher) => {
    dispatcher(event.target.value)    
}

const handleLogout = (event, props) => {
    event.preventDefault()
    props.changeUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
}

const LoginForm = (props) => {
    return(
        <div>
            {props.userInfo.user === null ?
            <div>
                <h2>Log in to application</h2>            
                <Togglable buttonLabel ='login'>
                    <form onSubmit = {e => login(e, props)}>         
                    <ImputField name = 'username'
                                type = 'text' 
                                onChange = {e => handleChange(e, props.changeUsername)} />

                    <ImputField name = 'password'
                                type = 'password'
                                onChange = {e => handleChange(e, props.changePassword)} />

                    <Button content = 'login'/>
                                
                    </form>
                </Togglable>
            </div>
            : <div></div>
            }
        </div>  
    )
} 

const mapStateToProps = (state) => {
    return{
        userInfo: state.user
    }
}

const mapDispatchToProps = {
    changeUser,
    changeUsername,
    changePassword,
    notify
}

const ConnectedLoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm