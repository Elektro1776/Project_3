import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Dropdown from 'react-toolbox/lib/dropdown';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AvatarComp from './avatar_comp';

const values = [
  { value: 'issue', label: 'New Issue' },
  { value: 'pull_request', label: 'New Pull Request' },
];
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class IssuePullModal extends Component {
  state = {
    showing: 'issue',
    title: '',
    body: '',
    assignees: [],
  }
  componentWillMount () {
    this.setState({ showing: this.props.modalName });
  }
  handlePullRequestDisplay = (value) => {
    this.setState({ showing: value });
  }
  handleCheck = (user) => {
    const currentAssignees = this.state.assignees;
    if (currentAssignees.length === 0) {
      currentAssignees.push(user);
    } else {
      function nameCheck() {
        for (let i = 0; i < currentAssignees.length; i++) {
          if (currentAssignees[i] === user) {
            return i;
          }
        }
        return false;
      }
      if (nameCheck() === false) {
        // console.log('I am false');
        currentAssignees.push(user);
      } else {
        // console.log('I should be removing');
        const index = nameCheck();
        // console.log('Here is my index', nameCheck());
        currentAssignees.splice(index, 1);
      }
    }
    this.setState({ assignees: currentAssignees });
  }
  handleIssueFormChange = (event) => {
    const prop = event.target.name;
    const val = event.target.value;
    this.setState({ [prop]:val });
    // console.log('heres state', this.state);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.showing === 'issue') {
      this.props.handleCreateIssueData(this.state.title, this.state.body, this.state.assignees);
    }
    else if (this.state.showing === 'pull_request') {
      console.log('you submitted a pull request');
    }
  }
  render() {
    // console.log('Here are my assignees', this.state.assignees);
    if (this.state.showing === 'issue') {
      return (
        <div>Hellow WOrld</div>
        // <div onClick={this.props.handleIssuePullClick}>
        //   {
        //     this.props.isShowing &&
        //     <ModalContainer onClose={this.props.handleIssuePullClose}>
        //       <ModalDialog onClose={this.props.handleIssuePullClose}>
        //         <span style={{ visibility: 'hidden' }}>loremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem</span>
        //         <Dropdown
        //           auto
        //           label={`Choose Type`}
        //           onChange={this.handlePullRequestDisplay}
        //           source={values}
        //           value={this.state.showing}
        //         />
        //         <form style={{ marginBottom: 25 }} onSubmit={this.handleSubmit}>
        //           <p>Title</p>
        //           <input name="title" style={{ width: '100%' }} onChange={this.handleIssueFormChange} />
        //           <p>Body</p>
        //           <textarea defaultValue={this.state.body} name="body" onChange={this.handleIssueFormChange} style={{ width: '100%', height: '75px' }} />
        //           <div>
        //             <p>Assignees</p>
        //             {this.props.collabs.map((collab) => (
        //               <div key={collab.id} >
        //                 <MuiThemeProvider>
        //                   <Checkbox
        //                     label={<AvatarComp collab={collab} />}
        //                     style={styles.checkbox}
        //                     onCheck={() => this.handleCheck(collab.login)}
        //                   />
        //                 </MuiThemeProvider>
        //               </div>
        //             ))}
        //
        //           </div>
        //           <button className="btn btn-lg btn-success" type='submit'>Submit</button>
        //           <button className="btn btn-lg btn-danger" onClick={this.props.handleIssuePullClose}> Cancel</button>
        //         </form>
        //       </ModalDialog>
        //
        //     </ModalContainer>
        //   }
        // </div>
      );
    }
    // else if (this.state.showing === 'assignee') {
    //   return (
    //     <p>HellowWorld</p>
    //   );
    // }
    // else if (this.state.showing === 'pull_request') {
    //   return (
    //     <div onClick={this.props.handleIssuePullClick}>
    //       {
    //         this.props.isShowing &&
    //         <ModalContainer onClose={this.props.handleIssuePullClose}>
    //           <ModalDialog onClose={this.props.handleIssuePullClose}>
    //             <Dropdown
    //               auto
    //               label={`Choose Type`}
    //               onChange={this.handlePullRequestDisplay}
    //               source={values}
    //               value={this.state.showing}
    //             />
    //             <p>New Pull</p>
    //             <button className="btn btn-lg btn-success">Submit</button>
    //             <button className="btn btn-lg btn-danger" onClick={this.props.handleIssuePullClose}> Cancel</button>
    //           </ModalDialog>
    //
    //         </ModalContainer>
    //       }
    //     </div>
    //   );
    // }
  }
}
export default IssuePullModal;
