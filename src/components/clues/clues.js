import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import SubHeader from 'material-ui/Subheader'
import ClueSection from './section'

import crosswordStore from '../../store/crosswordstore'
import { ORIENTATION } from '../../constants'

class Clues extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      horizontal: crosswordStore.getHorizontalWords(),
      vertical: crosswordStore.getVerticalWords()
    }
    this.resetState = this.resetState.bind(this)
  }

  resetState() {
    this.setState({
      horizontal: crosswordStore.getHorizontalWords(),
      vertical: crosswordStore.getVerticalWords()
    })
  }

  componentWillMount() {
    crosswordStore.on('change', this.resetState)
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetState)
  }

  render() {
    const cardStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      margin: 20,
      // maxWidth: '50%',
    }

    const seperatorStyle = {
      display: 'inline-block',
      width: 30
    }

    return (
      <Card style={cardStyle}>
        <CardTitle title="Clues"/>
        <CardText>
          <ClueSection
            key={ORIENTATION.HORIZONTAL + ' clue section'}
            heading={ORIENTATION.HORIZONTAL}
            data={this.state.horizontal}
          />
          <div style={seperatorStyle}></div>
          <ClueSection
            key={ORIENTATION.VERTICAL + ' clue section'}
            heading={ORIENTATION.VERTICAL}
            data={this.state.vertical}
          />
        </CardText>
      </Card>
    )
  }
}

export default Clues
