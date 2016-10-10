import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import SubHeader from 'material-ui/Subheader'
import ClueSection from './section'

import crosswordStore from '../../store/crosswordstore'
import { ORIENTATION } from '../../constants'

class Clues extends React.Component {
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
            data={crosswordStore.getHorizontalWords()}
          />
          <div style={seperatorStyle}></div>
          <ClueSection
            key={ORIENTATION.VERTICAL + ' clue section'}
            heading={ORIENTATION.VERTICAL}
            data={crosswordStore.getVerticalWords()}
          />
        </CardText>
      </Card>
    )
  }
}

export default Clues
