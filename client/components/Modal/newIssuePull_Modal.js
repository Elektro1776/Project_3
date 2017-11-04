import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Dropdown from 'react-toolbox/lib/dropdown';

const values = [
  {value: 'issue', label: 'New Issue'},
  {value: 'pull_request', label: 'New Pull Request'},
]

class IssuePullModal extends Component {
  state = {
    showing: 'issue',
    title: '',
    body: '',
    assignees: '',
  }
  handlePullRequestDisplay = (value) => {
    this.setState({ showing: value });
  }
  render() {
    if (this.state.showing === 'issue') {
      return (
        <div onClick={this.props.handleIssuePullClick}>
          {
            this.props.isShowing &&
            <ModalContainer onClose={this.props.handleIssuePullClose}>
              <ModalDialog onClose={this.props.handleIssuePullClose}>
                <Dropdown
                  auto
                  label={`Choose Type`}
                  onChange={this.handlePullRequestDisplay}
                  source={values}
                  value={this.state.showing}
                />
                <p>Title</p>
                <input name='title' />
                <p>Body</p>
                <textarea defaultValue={this.state.body} name='body' onChange={this.props.changeHandler} style={{ width: '100%', height: '75px' }}>

                </textarea>
                <p>Assignees</p>
                <button className="btn btn-lg btn-success">Submit</button>
                <button className="btn btn-lg btn-danger" onClick={this.props.handleIssuePullClose}> Cancel</button>
              </ModalDialog>

            </ModalContainer>
          }
        </div>
      );
    }
    else if (this.state.showing === 'pull_request') {
      return (
        <div onClick={this.props.handleIssuePullClick}>
          {
            this.props.isShowing &&
            <ModalContainer onClose={this.props.handleIssuePullClose}>
              <ModalDialog onClose={this.props.handleIssuePullClose}>
                <Dropdown
                  auto
                  label={`Choose Type`}
                  onChange={this.handlePullRequestDisplay}
                  source={values}
                  value={this.state.showing}
                />
                <p>New Pull</p>
                <button className="btn btn-lg btn-success">Submit</button>
                <button className="btn btn-lg btn-danger" onClick={this.props.handleIssuePullClose}> Cancel</button>
              </ModalDialog>

            </ModalContainer>
          }
        </div>
      );
    }
  }
}
export default IssuePullModal;
