import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import CopyToClipboard from 'react-copy-to-clipboard'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import ActionDone from 'material-ui/svg-icons/action/done'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'

import crosswordStore from '../../store/crosswordstore'

class ShareUrl extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: crosswordStore.getInnerData(),
      copied: false
    }
    this.resetState = this.resetState.bind(this)
  }

  resetState() {
    this.setState({
      data: crosswordStore.getInnerData(),
      copied: false
    })
  }

  componentWillMount() {
    crosswordStore.on('change', this.resetState)
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetState)
  }

  handleCopy() {
    this.setState({
      data: this.state.data,
      copied: true
    })
    window.setTimeout(this.resetState, 3000);
  }

  makeUrl() {
    let location = window.location
    return location.protocol + '//' + location.host + '/#/complete?data=' + this.state.data
  }

  render() {
    return (
      <div>
        <p>Share this URL so people can complete your crossword puzzle:</p>
        <TextField
          name='url'
          value={this.makeUrl()}
          fullWidth={true}
        />
        <FlatButton
          label="Back"
          disableTouchRipple={true}
          disableFocusRipple={true}
          onTouchTap={this.props.handlePrev}
          style={{marginRight:12}}
        />
        <CopyToClipboard
            text={this.makeUrl()}
            onCopy={this.handleCopy.bind(this)}
            >
          <RaisedButton
            label="Copy URL"
            primary={true}
            icon={
              <ContentCopy />
            }
            labelPosition='before'
          />
        </CopyToClipboard>
        <ReactCSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            style={{display:'inline-block'}}
            >
          {
            this.state.copied
            ? <Chip style={{marginLeft: 10}}>
                <Avatar icon={<ActionDone />} />
                Copied
              </Chip>
            : ''
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default ShareUrl
