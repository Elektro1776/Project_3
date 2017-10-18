import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardText } from 'react-toolbox/lib/card';
import styles from './cardComments.css';
import { convertDate } from '../EventFeed/logical_solutions';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';

class CardComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueComments: [],
    };
  }
  componentDidMount() {
    console.log('Comments has mounted');
    this.props.fetchUserComments("901david", 'Flashcard-Fun', this.props.issueNumberToGet);
  }
  componentWillReceiveProps(nextProps) {
    // console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { issueComments } = nextProps;
    // console.log(' WHAT IS USER REPOS', userRepos);
    if (issueComments.length !== 0) {
      this.setState({ issueComments: issueComments });
    }
  }
  render() {
    console.log(this.state.issueComments, ' here are our comments');
    return (
      <div>
        { this.state.issueComments.map((comment, i) => (
          <div key={comment.id}>
            <CardText>
              <h6 className={styles.byWho}>{ `Comment by ${comment.user.login}${convertDate(comment.created_at)}` }</h6>
              <p>{ comment.body }</p>
            </CardText>
          </div>
        ),

        )
        }
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  issueComments: state.comments.issueComments,
}), (dispatch) => ({
  fetchUserComments: (userId, repoName, issueNum) => dispatch(fetchUserComments(userId, repoName, issueNum)),
}))(CardComments);
