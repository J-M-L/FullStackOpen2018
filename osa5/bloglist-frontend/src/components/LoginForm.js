import React from 'react'
import ImputField from './InputField'
import Button from './Button'

const LoginForm = ({handleSubmit, handleChange, username, password, notification}) => {
    return(
        <div>            
            <h2>Log in to application</h2>
            <form onSubmit = {handleSubmit}>         
            <ImputField name = 'username'
                        type = 'text'
                        value = {username} 
                        onChange = {handleChange} />

            <ImputField name = 'password'
                        type = 'password'
                        value = {password} 
                        onChange = {handleChange} />
            <Button content = 'login'/>
                        
            </form>
        </div>
    )
} 

export default LoginForm