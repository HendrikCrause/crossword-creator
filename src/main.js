import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Pages from './components/pages'
import theme from './theme/theme'

injectTapEventPlugin()

const App = () => (
  <MuiThemeProvider muiTheme={theme}>
    <Pages />
  </MuiThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
