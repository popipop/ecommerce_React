import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import PanierProvider from './context/PanierProvider'
import * as serviceWorker from './serviceWorker'

require('dotenv').config()

const AppWithPanierProvider = () => (
  <PanierProvider>
    <App />
  </PanierProvider>
)

ReactDOM.render(<AppWithPanierProvider />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
