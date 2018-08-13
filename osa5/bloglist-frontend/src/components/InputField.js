import React from 'react'

const InputField = (props) => {
    return(
      <div>
        <a>{props.name}:</a>
        <input name = {props.name}
               type = {props.type}
               value = {props.value}
               onChange = {props.onChange} />
      </div>
    )
}

export default InputField