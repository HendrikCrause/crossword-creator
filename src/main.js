import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Layout from './components/layout'
import theme from './theme/theme'

injectTapEventPlugin()

const App = () => (
  <MuiThemeProvider muiTheme={theme}>
    <Layout />
  </MuiThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
