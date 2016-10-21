import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDone from 'material-ui/svg-icons/action/done'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import Crossword from '../crossword/crossword'
import Clues from '../clues/clues'

import crosswordStore from '../../store/crosswordstore'

class Complete extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      check: false
    }
  }

  componentWillMount() {
    try {
      crosswordStore.setInnerData(this.props.location.query.data)
    } catch(err) {
      console.error(err)
      this.props.history.push('')
    }
  }

  resetCheck() {
    this.setState({
      errors: [],
      check: false
    })
  }

  handleCheckButtonClick() {
    this.setState({
      ...this.state,
      check: true
    })
    window.setTimeout(this.resetCheck.bind(this), 5000)
  }

  addError(err) {
    if(this.state.check){
      this.setState({
        ...this.state,
        errors: this.state.errors.concat(err)
      })
    }
  }

  hasNoErrors() {
    return this.state.check && this.state.errors.length === 0;
  }

  render() {
    const buttonStyle = {
      margin: 20
    }

    return (
      <div>
        <Crossword
          empty={true}
          check={this.state.check}
          addError={this.addError.bind(this)}
        />
        <Clues />
        <div>
          <RaisedButton
            style={buttonStyle}
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
              ? <Chip style={{marginLeft: 10}}>
                  <Avatar icon={<ActionDone />} />
                  Copied
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
