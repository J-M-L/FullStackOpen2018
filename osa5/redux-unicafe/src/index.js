import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reviewReducer from './components/Reducer'

let storeNow = {}

const store = createStore(reviewReducer)

store.subscribe(() => {
    storeNow = store.getState()
})


const Statistiikka = () => {
  const palautteita = storeNow

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const goodValue = store.getState()['good'] | 0
  const okValue = store.getState()['ok'] | 0
  const badValue = store.getState()['bad'] | 0
  const average = (Math.round((goodValue * 1 + badValue * -1) / (goodValue + okValue + badValue) *1000)) / 10 | 0
  const positive = Math.round(goodValue / (goodValue + okValue + badValue)*1000) / 10 | 0

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{goodValue}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{okValue}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{badValue}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average}%</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive}%</td>
          </tr>
        </tbody>
      </table>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({
        type: nappi
    })

  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
        <button onClick={this.klik('ZERO')}>nollaa tilasto</button>
      </div>
    )
  }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
