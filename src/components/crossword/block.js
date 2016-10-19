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
      value: event.target.value.substr(event.target.value.length - 1)
    })
    this.props.goToNextBlock()
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
