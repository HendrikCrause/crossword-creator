import React from 'react'
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Introduction from './introduction'
import Create from './create'
import Review from './review'

class Flow extends React.Component {

    state = {
      stepIndex: 0,
    };

    handleNext = () => {
      const {stepIndex} = this.state;
      if (stepIndex < 2) {
        this.setState({stepIndex: stepIndex + 1});
      }
    };

    handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
    };

    renderStepActions(step) {
      return (
        <div style={{margin: '12px 0'}}>
          {step < 2 && <RaisedButton
            label="Next"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={this.handleNext}
            style={{marginRight: 12}}
          />}
          {step > 0 && (
            <FlatButton
              label="Back"
              disableTouchRipple={true}
              disableFocusRipple={true}
              onTouchTap={this.handlePrev}
            />
          )}
        </div>
      );
    }

    render() {
      const {stepIndex} = this.state;

      return (
        <div style={{
          marginBottom: 20
        }}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                Introduction
              </StepButton>
              <StepContent>
                <p>
                  Welcome message
                </p>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                Create a crossword puzzle
              </StepButton>
              <StepContent>
                <Create/>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                Review crossword puzzle
              </StepButton>
              <StepContent>
                <Review/>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
      );
    }
}

export default Flow
