import React, { Component } from 'react';
import Markdown from 'react-remarkable';
import newReadme from './convert_readme_links.js';
import styles from './readme_style.css';

class RenderMarkdown extends Component {
  render() {
    return (
        <div className={styles.readmeBox}>
          <Markdown source={ newReadme } />
        </div>
    );
  }
}

export default RenderMarkdown;
