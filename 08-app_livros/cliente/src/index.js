import React from 'react'
import ReactDOM from 'react-dom'
import App from './componentes/App.jsx'
//import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

const MuiApp = () => (
  <React.Fragment>
    <CssBaseline/>
    <App/>
  </React.Fragment>
)
/*
const M = () => (
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
)
*/
ReactDOM.render(<MuiApp/>, document.getElementById('root'))
