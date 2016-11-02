import React from 'react'
import TextField from 'material-ui/TextField'

import crosswordStore from '../../store/crosswordstore'
import { updateName, updateDescription } from '../../actions/crosswordactions'

class NameAndDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: crosswordStore.name,
      description: crosswordStore.description
    }
    this.resetState = this.resetState.bind(this)
  }

  componentWillMount() {
    crosswordStore.on('change', this.resetState)
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetState)
  }

  resetState() {
    this.setState({
      name: crosswordStore.name,
      description: crosswordStore.description
    })
  }

  handleUpdateName(event) {
    updateName(event.target.value)
  }

  handleUpdateDescription(event) {
    updateDescription(event.target.value)
  }

  renderDisplayMode() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <p>{this.state.description}</p>
      </div>
    )
  }

  renderEditMode() {
    return (
      <div>
        <p>Give your crossword puzzle a name (optional)</p>
        <TextField
          value={this.state.name}
          name={'name'}
          onChange={this.handleUpdateName.bind(this)}
        />
        <p>Give your crossword puzzle a description / instructions (optional)</p>
        <TextField
          fullWidth={true}
          multiLine={true}
          value={this.state.description}
          name={'description'}
          onChange={this.handleUpdateDescription.bind(this)}
        />
      </div>
    )
  }

  render() {
    let out = ''
    if(this.props.displayMode) {
      out = this.renderDisplayMode()
    } else {
      out = this.renderEditMode()
    }
    return out
  }
}

export default NameAndDescription
