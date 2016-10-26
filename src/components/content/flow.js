import React from 'react'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import Introduction from './introduction'
import Create from './create'
import Review from './review'

class Flow extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        stepIndex: 0
      }
    }

    handleNext() {
      const {stepIndex} = this.state
      if (stepIndex < 2) {
        this.setState({stepIndex: stepIndex + 1})
      }
    }

    handlePrev() {
      const {stepIndex} = this.state
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1})
      }
    }

    generate() {
      console.log('Generating crossword');
    }

    render() {
      return (
        <div style={{
          margin: 20
        }}>
          <Stepper
            activeStep={this.state.stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                Introduction
              </StepButton>
              <StepContent>
                <Introduction
                  handleNext={this.handleNext.bind(this)}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                Create a crossword puzzle
              </StepButton>
              <StepContent>
                <Create
                  handleNext={this.handleNext.bind(this)}
                  handlePrev={this.handlePrev.bind(this)}
                  generate={this.generate.bind(this)}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                Review crossword puzzle
              </StepButton>
              <StepContent>
                <Review
                  handlePrev={this.handlePrev.bind(this)}
                  generate={this.generate.bind(this)}
                />
              </StepContent>
            </Step>
          </Stepper>
        </div>
      )
    }
}

export default Flow
