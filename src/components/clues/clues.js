import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import SubHeader from 'material-ui/Subheader'
import ClueSection from './section'

import crosswordStore from '../../store/crosswordstore'
import { ORIENTATION, BLOCK_SIZE, MARGIN_SIZE, CONTAINER_WIDTH_PERC } from '../../constants'
import {clearConsole} from '../../util/util'

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
    window.addEventListener('resize', this.resetState)
  }

  componentDidMount() {
    this.resetState()
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetState)
    window.removeEventListener('resize', this.resetState)
  }

  calcMinWidth() {
    const longest = crosswordStore.longestClueSize()
    return 40 + 8 * longest
  }

  calcMaxWidth() {
    const containerWidth = Math.floor(this.realWindowWidth() * CONTAINER_WIDTH_PERC / 100)
    const crosswordWidth = crosswordStore.calcWidth()
    const maxWidth = containerWidth - (crosswordWidth * BLOCK_SIZE) - (MARGIN_SIZE * 4) - 5
    return maxWidth > this.calcMinWidth() ? maxWidth : '100%'
  }

  realWindowWidth() {
    return document.getElementsByTagName('body')[0].clientWidth
  }

  render() {
    const maxWidth = this.calcMaxWidth()
    const cardStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      margin: 20,
      maxWidth: maxWidth,
    }

    const seperatorStyle = {
      display: 'inline-block',
      width: 30
    }

    const inlineSections = true

    return (
      <Card style={cardStyle}>
        <CardTitle title="Clues"/>
        <CardText>
          <ClueSection
            key={ORIENTATION.HORIZONTAL + ' clue section'}
            heading={ORIENTATION.HORIZONTAL}
            data={this.state.horizontal}
            inline={inlineSections}
          />
          <ClueSection
            key={ORIENTATION.VERTICAL + ' clue section'}
            heading={ORIENTATION.VERTICAL}
            data={this.state.vertical}
            inline={inlineSections}
          />
        </CardText>
      </Card>
    )
  }
}

export default Clues
