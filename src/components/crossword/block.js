import React from 'react'
import colors from '../../theme/colors'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

class Block extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.empty ? '' : this.props.value
    }
  }

  componentDidUpdate() {
    this.handleFocus()
  }

  componentDidMount() {
    this.handleFocus()
  }

  handleFocus() {
    if(this.input && this.props.focus) {
      this.input.focus()
    }
  }

  handleChange(event) {
    this.setState({
      value: this.determineNewCharacter(event.target.value)
    })
    this.props.goToNextBlock()
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

  render() {
    const fieldStyle = {
      backgroundColor: colors.canvasColor,
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

    return (
      <Paper
        zDepth={0}
        style={{display: 'inline-block', position: 'relative'}}
      >
        {
          this.props.number ? (<p style={numberStyle}>{this.props.number}</p>) : ''
        }
        <TextField
          style={fieldStyle}
          inputStyle={{textAlign: 'center'}}
          underlineStyle={{width: '90%'}}
          id={this.props.idx}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          onTouchTap={this.props.focusOnBlock}
          ref={(input) => this.input = input }
        />
      </Paper>
    )
  }
}

export default Block
