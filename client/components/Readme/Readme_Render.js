import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-remarkable';
import convertLinks from './convert_readme_links.js';
import styles from './readme_style.css';
import { fetchUserReadme } from '../../actions/githubActions/getReadmeAction';

class RenderMarkdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readme: [],
    }

  }
  componentDidMount() {
    // console.log('read me just mounted111111');
    this.props.fetchUserReadme('901david', 'Flashcard-Fun');
  }
  componentWillReceiveProps(nextProps) {
    // console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { readme } = nextProps;
    // console.log(' WHAT IS USER REPOS', userRepos);
    if (readme.length !== 0) {
      this.setState({ readme });
    }
  }
  render() {
    const readMeConverted = convertLinks(this.state.readme.toString(), this.props.userName, this.props.repoName);
    const readMeWithImages = convertLinks(readMeConverted, this.props.userName, this.props.repoName);
    // console.log(readMeWithImages, 'this is my converted read me');
    return (
        <div className={styles.readmeBox}>
          <Markdown source={ readMeWithImages } />
        </div>
    );
  }
}

export default connect((state, ownProps) => ({
  readme: state.readme.readme,
}), (dispatch) => ({
  fetchUserReadme: (userId, repoName) =>  dispatch(fetchUserReadme(userId, repoName)),
}))(RenderMarkdown);
