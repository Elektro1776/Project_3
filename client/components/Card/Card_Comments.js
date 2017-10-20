import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardText } from 'react-toolbox/lib/card';
import styles from './cardComments.css';
import { convertDate } from '../EventFeed/logical_solutions';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';
import { addUserComment } from '../../actions/githubActions/addCommentAction';
import ModalIssueComment from '../Modal/comment_modal';
import token from '../../../gittoken';

class CardComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueComments: [],
      newComment: [],
    };
  }
  componentDidMount() {
    console.log('dat used to fetch comments!!!!!!!!!!!!!!!!!', this.props.repoOwner, this.props.repoName, this.props.issueNumberToGet, token);
    this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, this.props.issueNumberToGet, token);
  }
  componentWillReceiveProps(nextProps) {
    // console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { issueComments, newComment } = nextProps;
    console.log(' WHAT IS USER REPOS', issueComments);
    if (issueComments.length !== 0) {

      this.setState({ issueComments: issueComments });
    }
    // if (newComment.length !== 0) {
    //
    //   this.setState({ newComment: comment });
    // }
  }
  render() {
    console.log(this.state.issueComments, ' here are our issue comments');
    return (
      <div>
        {/* <ModalIssueComment handleClick={this.props.handleClick} handleClose={this.props.handleClose} state={this.props.state} handleAddComment={this.props.addUserComment} /> */}

        {/* { this.state.issueComments.map((comment, i) => (
          <div key={comment.id}>
            <CardText>
              <h6 className={styles.byWho}>{ `Comment by ${comment.user.login}${convertDate(comment.created_at)}` }</h6>
              <p>{ comment.body }</p>
            </CardText>
          </div>
        ),

        )
        } */}
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  issueComments: state.comments.issueComments,
}), (dispatch) => ({
  fetchUserComments: (userId, repoName, issueNum, token) => dispatch(fetchUserComments(userId, repoName, issueNum, token)),
  addUserComment: (userName, repoName, issueNum, body, token) => dispatch(addUserComment(userName, repoName, issueNum, body, token)),
}))(CardComments);
