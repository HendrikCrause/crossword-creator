import React from 'react'
import colors from '../../theme/colors'

class Block extends React.Component {
  render() {
    let style = {
      backgroundColor: colors.canvasColor,
      color: colors.textColor,
      borderColor: colors.borderColor,
      width: this.props.size,
      height: this.props.size,
      display: 'inline-block',
      textAlign: 'center',
      padding: 5,
      margin: 0
    }

    let disabled = false

    if(this.props.value && this.props.value === '#'){
      style.backgroundColor = colors.disabledColor
      disabled = true
    }

    return (
      <input
        type='text'
        style={style}
        value={this.props.value}
        disabled={disabled}
      />
    )
  }
}

export default Block
