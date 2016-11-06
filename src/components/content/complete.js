import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDone from 'material-ui/svg-icons/action/done'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import Crossword from '../crossword/crossword'
import Clues from '../clues/clues'
import NameAndDescription from '../header/namedesc'

import crosswordStore from '../../store/crosswordstore'

import colors from '../../theme/colors'

class Complete extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      check: false
    }
  }

  componentWillMount() {
    try {
      crosswordStore.setInnerData(this.props.location.query.data)
    } catch(err) {
      console.error(err)
      crosswordStore.reset()
      this.props.history.push('')
    }
  }

  resetCheck() {
    this.setState({
      check: false
    })
  }

  handleCheckButtonClick() {
    this.setState({
      check: true
    })
    window.setTimeout(this.resetCheck.bind(this), 5000)
  }

  hasNoErrors() {
    return this.state.check && !crosswordStore.hasErrors()
  }

  render() {

    return (
      <div>
        <NameAndDescription displayMode={true}/>
        <Crossword
          empty={true}
          check={this.state.check}
        />
        <Clues />
        <div>
          <RaisedButton
            style={{margin: 20}}
            label="Check"
            primary={true}
            icon={
              <ActionDone />
            }
            labelPosition='before'
            onTouchTap={this.handleCheckButtonClick.bind(this)}
          />
          <ReactCSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
              style={{display:'inline-block'}}
              >
            {
              this.hasNoErrors()
              ? <Chip style={{marginLeft: 20}} backgroundColor={colors.ui.greenA200}>
                  <Avatar backgroundColor={colors.ui.greenA400} icon={<ToggleStar />} />
                  Correct
                </Chip>
              : ''
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Complete
