import React from 'react'
import colors from '../../theme/colors'

class DisabledBlock extends React.Component {
  render() {
    const style = {
      backgroundColor: colors.borderColor,
      color: colors.textColor,
      borderColor: colors.borderColor,
      borderWidth: 1,
      borderStyle: 'solid',
      width: this.props.size,
      height: this.props.size,
      padding: 3,
      margin: 0,
      display: 'inline-block',
      verticalAlign: 'top',
      boxSizing: 'border-box'
    }

    return ( <div style={style} id={this.props.idx } /> )
  }
}

export default DisabledBlock
