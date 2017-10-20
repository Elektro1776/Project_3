import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-remarkable';
import convertLinks from './convert_readme_links.js';
import styles from './readme_style.css';


class RenderMarkdown extends Component {
  render() {
    const readMeConverted = this.props.readme.toString();
    const readMeWithImages = convertLinks(readMeConverted, this.props.userName, this.props.repoName);
    // console.log(readMeWithImages, 'this is my converted read me');
    return (
        <div className={styles.readmeBox}>
          <Markdown source={ readMeWithImages } />
        </div>
    );
  }
}

export default RenderMarkdown;
