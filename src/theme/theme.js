import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './styles.css'
import 'roboto-font/css/fonts.css'
import colors from './colors'

const theme = getMuiTheme({
  palette: {
    primary1Color: colors.primary1Color,
    primary2Color: colors.primary2Color,
    primary3Color: colors.primary3Color,
    accent1Color: colors.accent1Color,
    accent2Color: colors.accent2Color,
    accent3Color: colors.accent3Color,
    textColor: colors.textColor,
    alternateTextColor: colors.alternateTextColor,
    canvasColor: colors.canvasColor,
    borderColor: colors.borderColor,
    disabledColor: colors.disabledColor,
    pickerHeaderColor: colors.pickerHeaderColor,
    clockCircleColor: colors.clockCircleColor,
    shadowColor: colors.shadowColor,
  }
})

export default theme
