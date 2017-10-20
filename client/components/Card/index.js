import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import CardComments from './Card_Comments';
import CardAssignees from './Card_Assignees';
import styles from './issueCards.css';
import Collapsible from 'react-collapsible';
import DropdownTrigger from './Dropdown_Card';
import token from '../../../gittoken';
import { closeUserIssue } from '../../actions/githubActions/closeIssueAction';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';
import ModalIssueComment from '../Modal/comment_modal';
import { addUserComment } from '../../actions/githubActions/addCommentAction';

class IssueCard extends Component {
  state = {
    isShowingModal: false,
    issuesLoaded: false,
    commentsLoaded: false,
    issues: null,
    issueComments: null,
    newCommentText: '',
  }
  componentDidMount() {
    this.props.issues.map((issue) => {
      this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, token);
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(' WHEN DO WE GET NEW ISSUES?', nextProps.issueComments);
    // console.log("this should show projects connected in state", nextProps.currentProject);
    const { issueComments, issues } = nextProps;
    // this.setState({ issueComments });
    const commentsLength = Object.keys(issueComments).length;
    const issuesLength = issues.length;
    if (commentsLength === issuesLength) {
      console.log("we dropped into ifff");
      this.setState({ issueComments, issues, commentsLoaded: true, issuesLoaded: true });
    }
    if(issueComments.length !== this.props.issueComments.length) {
      console.log('We have neewwww shiiizzzzzz');
      this.setState({ issueComments });
    }
  }
  modifyTextState = (event) => {
    this.setState({ newCommentText: event.target.value });
  }
  handleAddNewComment = () => {
    this.props.addUserComment('901david', 'test_repo', '1', this.state.newCommentText, token);
    this.handleClose();
  }
 handleClick = () => this.setState({ isShowingModal: true })
 handleClose = () => this.setState({ isShowingModal: false })
 handleCloseIssue = (login, repoName, issueNum, token) => {
  //  console.log('data to send on close issue', login, repoName, issueNum, token);
   this.props.closeUserIssue(login, repoName, issueNum, token);
 }
 shouldComponentUpdate(nextProps, nextState) {
   return true;
 }
 render() {
   const { issuesLoaded, commentsLoaded, issues, issueComments, isShowingModal } = this.state;
   const assigneeData = this.props.issues.map((issue, i) => issue.assignees);
   if (issuesLoaded && commentsLoaded) {
     if (isShowingModal) {
       return (
         <div>
           <ModalIssueComment changeHandler={this.modifyTextState} handleClick={this.handleClick} handleClose={this.handleClose} isShowingModal={this.state.isShowingModal} value={this.state.newCommentText} handleAddComment={this.handleAddNewComment} />
         </div>
       );
     }
     return (
       <div className={styles.mainCont}>
         {issues.map((issue, i) => (
           <div key={issue.id}>
             <Collapsible trigger={<DropdownTrigger issueTitle={issue.title} issueNumber={issue.number} />}>
               <Card className={styles.child}>
                 <CardTitle
                   avatar={issue.user.avatar_url}
                   title={issue.user.login}
                   //  subtitle={this.state.currentProject.name}
                 />
                 <CardTitle
                   subtitle={issue.body}
                 />
                 <CardComments issueComments={issueComments[issue.number]} handleClick={this.handleClick} handleClose={this.handleClose} />
                 <h6 style={{ marginLeft: 15 }}>Assignees</h6>

                 <CardAssignees assigneesData={assigneeData} indexValue={i} />

                 <CardActions>
                   <Button label="Add Comment" onClick={this.handleClick} />
                   <Button
                     label="Close Issue"
                     onClick={() => this.handleCloseIssue(issue.user.login, this.props.repoName, issue.number, token)}
                   />
                   {/* <Button label="Add to Matrix" /> */}
                 </CardActions>
               </Card>
             </Collapsible>
           </div>
         ),

         )
         }
       </div>

     );
   }
   return (
     <div>Loading you shizzzz</div>
   );
 }
}

// export default IssueCard;

export default connect((state, ownProps) => ({
  closedIssData: state.issue,
  currentProject: state.repos.currentProject,
  issueComments: state.comments.issueComments,
}), (dispatch) => ({
  closeUserIssue: (userId, repoName, issueNum, token) => dispatch(closeUserIssue(userId, repoName, issueNum, token)),
  fetchUserComments: (userId, repoName, issueNum, token) => dispatch(fetchUserComments(userId, repoName, issueNum, token)),
  addUserComment: (userName, repoName, issueNum, body, token) => dispatch(addUserComment(userName, repoName, issueNum, body, token)),
}))(IssueCard);
