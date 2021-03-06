import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './issueCards.css';
import { closeUserIssue } from '../../actions/githubActions/closeIssueAction';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';
import ModalIssueComment from '../Modal/comment_modal';
import { addUserComment } from '../../actions/githubActions/addCommentAction';
import IssuePullModal from '../Modal/newissuePull_Modal';
import { convertDate } from '../EventFeed/logical_solutions';
import { addNewAssignees } from '../../actions/githubActions/addAssigneesAction';
import { removeNewAssignees } from '../../actions/githubActions/removeAssigneesAction';
import Markdown from 'react-remarkable';

class IssueCard extends Component {
  state = {
    isShowingModal: false,
    issuesLoaded: false,
    commentsLoaded: false,
    assigneesLoaded: false,
    issues: null,
    issueComments: null,
    newCommentText: '',
    currentIssueNumber: '',
    currentModalState: '',
    assigneeData: null,
  }
  componentDidMount() {
    // console.log('INTIAL COMMENTS DATA TO SEND OFF ', this.props.repoOwner, this.props.repoName);
    this.props.issues.map((issue) => {
      this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token);
    });
  }
  componentWillReceiveProps(nextProps) {
    // console.log(' WHEN DO WE GET NEW ISSUES?', nextProps.issueComments);
    // console.log("this should show projects connected in state", nextProps.currentProject);
    const { issueComments, issues, repoName, repoOwner } = nextProps;
    // console.log('new issues coming in on next props to check for new assignees', issues);
    // this.setState({ issueComments });
    // console.log('State Prios in Card itself need to see if this is being modified', this.state.issues);
    // console.log('AM I geting the new issue Array', issues);
    // console.log('Here are next props in Issue card', repoName, repoOwner);
    const commentsLength = Object.keys(issueComments).length;
    const issuesLength = issues.length;
    if (this.state.issues !== null) {
      if (this.props.issues.length !== issues.length) {
        this.setState({ issuesLoaded: false });
        const assigneeData = this.props.issues.map((issue) => issue.assignees);
        // console.log('SETTING ISSUES STATE AS WE READ', this.state.issuesLoaded);
        this.setState({ issues, issuesLoaded: true, assigneeData, assigneesLoaded: true });
        issues.map((issue) => {
          this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token);
        });
        // console.log('Now this is state again and should be modified thus causing a re render', this.state.issues, this.state.issuesLoaded);
      }
    }
    if (commentsLength === issuesLength) {
      // console.log('Issues in Issue Card from next props', issues);
      // console.log('SETTING ISSUES STATE AS WE READ', this.state.issuesLoaded);
      const assigneeData = this.props.issues.map((issue) => issue.assignees);
      this.setState({ issueComments, issues, commentsLoaded: true, issuesLoaded: true, assigneeData, assigneesLoaded: true });
      // console.log('Now this is state again and should be modified thus causing a re render', this.state.issues, this.state.issuesLoaded);
    }
    if (this.state.issueComments !== null) {
      if (issueComments.length !== this.state.issueComments.length) {
        // console.log('do these comments reset?????');
        this.setState({ issueComments });
      }
    }
  }
handleModalStateChange = (state) => {
  this.setState({ currentModalState: state });
}
modifyTextState = (event) => {
  this.setState({ newCommentText: event.target.value });
}
handleAddNewComment = () => {
  const { currentIssue } = this.state;
  this.props.addUserComment(this.props.repoOwner, this.props.repoName, currentIssue, this.state.newCommentText, this.props.git_token);
  this.setState({ newCommentText: '' });
  this.handleClose();
}
handleClick = (currentIssue) => this.setState({ isShowingModal: true, currentIssue })
handleClose = () => this.setState({ isShowingModal: false })
handleCloseIssue = (login, repoName, issueNum, token) => {
// console.log('PASSING TO CLOSE ISSUE', login, repoName, issueNum, token);
  this.props.closeUserIssue(login, repoName, issueNum, token);
}
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
// this function handles adding new assignees, closing the modal, and refreshing the page
handleAddAssignees = (assignees) => {
  this.setState({ assigneesLoaded: false });
  this.props.addNewAssignees(this.props.repoOwner, this.props.repoName, this.props.currentIssueNumber, assignees, this.props.git_token);
  this.props.handleIssuePullClose();
  setTimeout(this.props.handleRefresh(), 2000);
}
handleRemoveAssignees = (assignees) => {
  this.setState({ assigneesLoaded: false });
  this.props.removeNewAssignees(this.props.repoOwner, this.props.repoName, this.props.currentIssueNumber, assignees, this.props.git_token);
  this.props.handleIssuePullClose();
  setTimeout(this.props.handleRefresh(), 2000);
}
render() {
  // console.log('STATE of issues at render', this.state.issues);
  // console.log('issue card mocal state', this.props.modalState);
  // console.log('Expanded card State', this.state.expandedCards);
  const { issuesLoaded, commentsLoaded, assigneesLoaded } = this.state;
  console.log('Card state issues!!!!!!!!!!!!!!!!!!!!', this.state.issues);
  // console.log('Here are the expanded cards', this.state.expandedCards);
  // console.log('Here aremy issue comments', this.state.issueComments);
  if (issuesLoaded && commentsLoaded && assigneesLoaded) {
    const { issues, issueComments, isShowingModal } = this.state;
    return (
      // <div className={styles.mainCont}>
      <div className={`card-group ${styles.mainCont}`}>
        {issues.map((issue, i) => (
          <div className="col-sm-6" key={issue.id}>
            <div className={`card ${styles.boxShad}`}>
              <div className="card-header" data-toggle="collapse" href={`#collapse${issue.number}`} >{`${issue.title} -  ${issue.pull_request ? 'Pull Request' : 'Issue'} #${issue.number}`}</div>
              <div id={`collapse${issue.number}`} className={`card-block collapse`}>
                <img className={`${styles.avatarFix} pull-left`} src={issue.user.avatar_url} alt="user" />
                <h6 className={`card-title pull-left ${styles.titleBump}`}>{`Opened By ${issue.user.login}`}</h6>
                <br />
                <br />
                <Markdown className="card-text" source={`${issue.body}`} />
                <br />
                <div>
                  {issueComments[issue.number].map((comment) => (
                    <div key={comment.id}>
                      <br />
                      <h6 className={styles.byWho}>{ `Comment by ${comment.user.login}${convertDate(comment.created_at)}` }</h6>
                      <Markdown className="card-text" source={`${comment.body}`} />
                    </div>
                  ),
                  )
                  }
                </div>
                <h5 style={{ marginTop: 5 }}>Current Assignees:</h5>
                <div className={styles.mainContAss} >
                  { this.state.assigneeData[i].map((assignee) => (
                    <div key={assignee.id}>
                      <img className={`${styles.avatarFix} pull-left`} src={assignee.avatar_url} alt="user" />
                    </div>
                  ))}
                </div>
                <div className={styles.buttonOrganizer}>
                  <div style={{ marginRight: 5 }} className={`btn btn-primary`} onClick={() => this.handleClick(issue.number)}>Comment</div>
                  <div style={{ marginRight: 5 }} className={`btn btn-primary`} onClick={() => this.handleCloseIssue(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token)}>Close</div>
                  <div className={`btn btn-primary`} onClick={() => this.props.handleModalState('assignee', issue.number)}>Assignees</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <IssuePullModal assigneeData={this.state.assigneeData} modalState={this.props.modalState} handleCreateIssueData={this.props.handleCreateIssueData} collabs={this.props.collabs} isShowing={this.props.issueModalState} handleAddAssignees={this.handleAddAssignees} handleIssuePullClick={this.props.handleIssuePullClick} handleIssuePullClose={this.props.handleIssuePullClose} handleRemoveAssignees={this.handleRemoveAssignees} />

        <ModalIssueComment
          changeHandler={this.modifyTextState}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          isShowingModal={this.state.isShowingModal}
          value={this.state.newCommentText}
          handleAddComment={this.handleAddNewComment}
        />

      </div>
    );
  }
  return (
    <div>
      <div className={styles.loaderContainerThree}>
        <img className={`center-block ${styles.loaderImageThree}`} src="./images/uTile_black_loader_100.gif" alt="loader" />
        {setTimeout(()=>{
          return (
          <h1 className={styles.loaderTextThree} style={{ color: 'white' }}>It does not looks like there are any issues currently.</h1>
        );
        }, 5000)}
      </div>
    </div>
  );
}
}

// export default IssueCard;

export default connect((state, ownProps) => ({
  collabs: state.collabs.collabs,
  closedIssData: state.issue,
  currentProject: state.repos.currentProject,
  issueComments: state.comments.issueComments,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
  // branches: state.branches.branches,
}), (dispatch) => ({
  closeUserIssue: (userId, repoName, issueNum, token) => dispatch(closeUserIssue(userId, repoName, issueNum, token)),
  fetchUserComments: (userId, repoName, issueNum, token) => dispatch(fetchUserComments(userId, repoName, issueNum, token)),
  addUserComment: (userName, repoName, issueNum, body, token) => dispatch(addUserComment(userName, repoName, issueNum, body, token)),
  addNewAssignees: (userName, repoName, issueNum, assignees, token) => dispatch(addNewAssignees(userName, repoName, issueNum, assignees, token)),
  removeNewAssignees: (userName, repoName, issueNum, assignees, token) => dispatch(removeNewAssignees(userName, repoName, issueNum, assignees, token)),
}))(IssueCard);
