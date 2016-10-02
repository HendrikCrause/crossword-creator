import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import SubHeader from 'material-ui/Subheader'
import ClueSection from './section'

const clueData = [
  {
    heading: 'Horizontal',
    data: [
      {
        number: 1,
        clue: 'This is the first clue'
      }
    ]
  },
  {
    heading: 'Vertical',
    data: [
      {
        number: 2,
        clue: 'This is a vertical clue'
      }
    ]
  }
]

class Clues extends React.Component {
  render() {
    const cardStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      margin: 20,
      maxWidth: '40%',
    }

    return (
      <Card style={cardStyle}>
        <CardTitle title="Clues"/>
        <CardText>
          {
            clueData.map((c, i) => {
              return (
                <ClueSection
                  key={i}
                  heading={c.heading}
                  data={c.data}
                />
              )
            })
          }
        </CardText>
      </Card>
    )
  }
}

export default Clues
