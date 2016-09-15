import React from 'react'
import colors from '../../theme/colors'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

class Block extends React.Component {
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
          defaultValue={this.props.value}
          underlineStyle={{width: '90%'}}
          id={this.props.idx}
        />
      </Paper>
    )
  }
}

export default Block
