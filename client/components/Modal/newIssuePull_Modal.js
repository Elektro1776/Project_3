import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class IssuePullModal extends Component {
  state = {
    showing: 'issue',
  }
  handlePullRequestDisplay = (type) => {
    this.setState({ showing: type });
  }
  render() {
    // console.log(this.props.value, 'my state');
    return (
      <div onClick={this.props.handleIssuePullClick}>
        {
          this.props.isShowing &&
          <ModalContainer onClose={this.props.handleIssuePullClose}>
            <ModalDialog onClose={this.props.handleIssuePullClose}>
              <p>Hellow WOrld</p>
              <button className="btn btn-lg btn-success">Submit</button>
              <button className="btn btn-lg btn-danger" onClick={this.props.handleIssuePullClose}> Cancel</button>
            </ModalDialog>

          </ModalContainer>
        }
      </div>
    );
  }
}
export default IssuePullModal;
