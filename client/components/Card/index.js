import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardComments from './Card_Comments';
import CardAssignees from './Card_Assignees';
import styles from './issueCards.css';
import { closeUserIssue } from '../../actions/githubActions/closeIssueAction';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';
import ModalIssueComment from '../Modal/comment_modal';
import { addUserComment } from '../../actions/githubActions/addCommentAction';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IssuePullModal from '../../components/Modal/newissuePull_Modal';

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
    const assigneeData = this.props.issues.map((issue, i) => issue.assignees);
    return (
      // <div className={styles.mainCont}>
      <div>
        {issues.map((issue, i) => (
          <div key={issue.id}>

            <div className="row">
              <div className='col-sm-12'>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-block">
                    <h3 className="card-title">{issue.title}</h3>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* <MuiThemeProvider>
              <Card style={{ width: 350, height: 'auto', margin: 10 }} expanded={this.state.expandedCards[issue.number].expanded} onExpandChange={() => this.handleCardExpansionChange(issue.number)}>
                <CardHeader
                  title={issue.title}
                  subtitle={`${issue.pull_request ? 'Pull Request' : 'Issue'} #${issue.number} Opened By ${issue.user.login}`}
                  avatar={issue.user.avatar_url}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  <p>{issue.body}</p>
                </CardText>
                <CardComments expandable={true} issueComments={issueComments[issue.number]} />
                <CardText expandable={true}>
                  <h5>Current Assignees:</h5>
                </CardText>
                <CardAssignees expandable={true} assigneesData={assigneeData} indexValue={i} />
                <CardActions expandable={true}>
                  <FlatButton label="Comment" onClick={() => this.handleClick(issue.number)} />
                  <FlatButton
                    label="Close"
                    onClick={() => this.handleCloseIssue(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token)}
                  />
                </CardActions>
              </Card>
            </MuiThemeProvider> */}
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
