import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} YO</p>
        </div>
    )
}

const App = () => {
    const nimi = "keijo 9000"
    const ika = 1
    return(
        <div>
            <h1>Greetings</h1>
            <Hello name = "Keijo1" age = {15 + 1} />
            <Hello name = {nimi} age = {15 + 1}/>
            <Hello name = "Keijo3" age = {ika + 1}/>
            <Hello name = "Keijo4" age = {ika + 1}/>
            <Hello name = "Keijo5" age = {ika + 1}/>

        </div>
    )}

ReactDOM.render(<App />, document.getElementById('root'))