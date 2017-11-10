import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './issueCards.css';
import { closeUserIssue } from '../../actions/githubActions/closeIssueAction';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';
import ModalIssueComment from '../Modal/comment_modal';
import { addUserComment } from '../../actions/githubActions/addCommentAction';
import IssuePullModal from '../Modal/newissuePull_Modal';
import { convertDate } from '../EventFeed/logical_solutions';

class IssueCard extends Component {
  state = {
    isShowingModal: false,
    issuesLoaded: false,
    commentsLoaded: false,
    issues: null,
    issueComments: null,
    newCommentText: '',
    currentIssueNumber: '',
    expandedCards: {},
  }
  handleCardExpansionChange = (issueNum) => {
    const expansionValue = !this.state.expandedCards[issueNum].expanded;
    let newObjGroup = this.state.expandedCards;
    newObjGroup = Object.assign({}, newObjGroup, { [issueNum]: { expanded: expansionValue } });
    this.setState({ expandedCards: newObjGroup });
  }
  handleCardExpansion = () => {
    let objGroup = {};
    this.props.issues.map((issue) => {
      objGroup = Object.assign({}, objGroup, { [issue.number]: { expanded: false } });
    });
    this.setState({ expandedCards: objGroup });
  }
  componentDidMount() {
    // console.log('INTIAL COMMENTS DATA TO SEND OFF ', this.props.repoOwner, this.props.repoName);
    this.props.issues.map((issue) => {
      this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token);
    });
    this.handleCardExpansion();
  }
  componentWillReceiveProps(nextProps) {
    // console.log(' WHEN DO WE GET NEW ISSUES?', nextProps.issueComments);
    // console.log("this should show projects connected in state", nextProps.currentProject);
    const { issueComments, issues, repoName, repoOwner } = nextProps;
    // this.setState({ issueComments });
    // console.log('State Prios in Card itself need to see if this is being modified', this.state.issues);
    // console.log('AM I geting the new issue Array', issues);
    // console.log('Here are next props in Issue card', repoName, repoOwner);
    const commentsLength = Object.keys(issueComments).length;
    const issuesLength = issues.length;
    if (this.state.issues !== null) {
      if (this.props.issues.length !== issues.length) {
        this.setState({ issuesLoaded: false });
        // console.log('SETTING ISSUES STATE AS WE READ', this.state.issuesLoaded);
        this.setState({ issues, issuesLoaded: true });
        issues.map((issue) => {
          this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token);
        });
        this.handleCardExpansion();
        // console.log('Now this is state again and should be modified thus causing a re render', this.state.issues, this.state.issuesLoaded);
      }
    }
    if (commentsLength === issuesLength) {
      // console.log('Issues in Issue Card from next props', issues);
      // console.log('SETTING ISSUES STATE AS WE READ', this.state.issuesLoaded);

      this.setState({ issueComments, issues, commentsLoaded: true, issuesLoaded: true });
      // console.log('Now this is state again and should be modified thus causing a re render', this.state.issues, this.state.issuesLoaded);
    }
    if (this.state.issueComments !== null) {
      if (issueComments.length !== this.state.issueComments.length) {
        this.setState({ issueComments });
      }
    }
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
handeStateInCardFromModal = () => {
  this.setState({ issuesLoaded: false, commentsLoaded: false });
  console.log('I work');
}
render() {
  // console.log('Expanded card State', this.state.expandedCards);
  const { issuesLoaded, commentsLoaded } = this.state;
  console.log('Card state issues!!!!!!!!!!!!!!!!!!!!', this.state.issues);
  console.log('Here aremy issue comments', this.state.issueComments);
  if (issuesLoaded && commentsLoaded) {
    const { issues, issueComments, isShowingModal } = this.state;
    if (isShowingModal) {
      return (
        <div>
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
    const assigneeData = this.props.issues.map((issue, j) => issue.assignees);
    return (
      // <div className={styles.mainCont}>
      <div className={`card-group ${styles.mainCont}`}>
        {issues.map((issue, i) => (
          <div className="col-sm-6" key={issue.id}>
            <div className="card">
              <div className="card-header">{issue.title}</div>
              <div className="card-block">
                <img className={`${styles.avatarFix} pull-left`} src={issue.user.avatar_url} alt="user" />
                <h6 className={`card-title pull-left ${styles.titleBump}`}>{`${issue.pull_request ? 'Pull Request' : 'Issue'} #${issue.number} Opened By ${issue.user.login}`}</h6>
                <br />
                <br />
                <p className="card-text">{issue.body}</p>
                <br />
                <div>
                  {issueComments[issue.number].map((comment) => (
                    <div key={comment.id}>
                      <br />
                      <h6 className={styles.byWho}>{ `Comment by ${comment.user.login}${convertDate(comment.created_at)}` }</h6>
                      <p className="card-text">{ comment.body }</p>
                    </div>
                  ),
                  )
                  }
                </div>
                <h5 style={{ marginTop: 5 }}>Current Assignees:</h5>
                <div className={styles.mainContAss} >
                  { assigneeData[i].map((assignee) => (
                    <div key={assignee.id}>
                      <img className={`${styles.avatarFix} pull-left`} src={assignee.avatar_url} alt="user" />
                    </div>
                  ))}
                </div>
                <div className={styles.buttonOrganizer}>
                  <div style={{ marginRight: 5 }} className={`btn btn-primary`} onClick={() => this.handleClick(issue.number)}>Comment</div>
                  <div style={{ marginRight: 5 }} className={`btn btn-primary`} onClick={() => this.handleCloseIssue(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token)}>Close</div>
                  <div className={`btn btn-primary`}>Add Assignee</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <IssuePullModal handleCreateIssueData={this.props.handleCreateIssueData} collabs={this.props.collabs} isShowing={this.props.issueModalState} handleIssuePullClick={this.props.handleIssuePullClick} handleIssuePullClose={this.props.handleIssuePullClose} />
      </div>
    );
  }
  return (
    <div>
      <div className={styles.loaderContainerThree}>
        <img className={`center-block ${styles.loaderImageThree}`} src="./images/uTile_black_loader_100.gif" alt="loader" />
        <h1 className={styles.loaderTextThree} style={{ color: 'white' }}>Loading...</h1>
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
}))(IssueCard);
