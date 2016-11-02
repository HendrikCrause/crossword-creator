import React from 'react'
import colors from '../../theme/colors'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

import * as Actions from '../../actions/crosswordactions'
import { idToCell } from '../../util/util'

class Block extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.empty ? '' : this.props.value
    }
  }

  componentDidUpdate() {
    this.handleFocus()
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentDidMount() {
    this.handleFocus()
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleFocus() {
    if(this.input && this.props.focus) {
      this.input.focus()
    }
  }

  handleKeyDown(event) {
    if(event.key === 'Delete') {
      if(this.props.focus) {
        event.preventDefault()
        this.setState({
          value: ''
        })
      }
    }
  }

  handleChange(event) {
    const newChar = this.determineNewCharacter(event.target.value)
    Actions.enterCharacter(idToCell(this.props.idx), newChar)

    this.setState({
      value: newChar
    })
    if(newChar !== '') {
      this.props.goToNextBlock()
    }
  }

  determineNewCharacter(value) {
    if(!value) {
      return ''
    }
    if(this.state.value === value) {
      return value
    }
    if(this.state.value === value[0]) {
      return value[value.length - 1]
    }
    return value[0]
  }

  determineError() {
    if(this.props.check
        && this.input
        && this.input.input.value.toLowerCase() !== this.props.value.toLowerCase()){
      return true
    }
    return false
  }

  render() {
    const error = this.determineError()
    const color = error ? colors.ui.redA100 : colors.canvasColor
    const fieldStyle = {
      backgroundColor: color,
      color: colors.textColor,
      borderColor: colors.borderColor,
      borderWidth: 1,
      borderStyle: 'solid',
      width: this.props.size,
      height: this.props.size,
      padding: 3,
      verticalAlign: 'top'
    }

    const numberStyle = {
      position: 'absolute',
      left: 3,
      top: -12,
      zIndex: 10,
      fontSize: 12,
      color: colors.disabledColor
    }

    const paperStyle = {
      display: 'inline-block',
      position: 'relative',
    }

    return (
      <Paper
        zDepth={0}
        style={paperStyle}
      >
        {
          this.props.number ? (<p style={numberStyle}>{this.props.number}</p>) : ''
        }
        <TextField
          style={fieldStyle}
          inputStyle={{textAlign: 'center'}}
          underlineStyle={{width: '90%'}}
          id={this.props.idx}
          value={this.props.empty ? this.state.value : this.props.value}
          onChange={this.handleChange.bind(this)}
          onTouchTap={this.props.focusOnBlock}
          ref={(input) => this.input = input }
          errorText={error ? ' ' : null}
        />
      </Paper>
    )
  }
}

export default Block
