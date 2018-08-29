import React from 'react'

const Button = (props) => {
  if(props.noDiv === 'true'){
    return(
      <button onClick = {props.onClick}>{props.content}</button>
    )
  }
  return(
    <div>
      <button onClick = {props.onClick}>{props.content}</button>
    </div>
  )
}

export default Button