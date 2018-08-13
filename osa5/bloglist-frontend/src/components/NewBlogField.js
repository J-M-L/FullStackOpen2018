import React from 'react'
import ImputField from './InputField'
import Button from './Button'

const NewBlogField = (props) => {
    return(
      <div>
        <h1>Create New</h1>
        <ImputField name = {props.titleState}
                    type = 'text'
                    value = {props.titleValue}
                    onChange = {props.titleOnChange}
        />
        <ImputField name = {props.authorState}
                    type = 'text'
                    value = {props.authorValue}
                    onChange = {props.authorOnChange}
        />
        <ImputField name = {props.urlState}
                    type = 'text'
                    value = {props.urlValue}
                    onChange = {props.urlOnChange}
        />
        <Button content = 'create' onClick = {props.createClick} />        
        <br/>
      </div>
    )
}

export default NewBlogField