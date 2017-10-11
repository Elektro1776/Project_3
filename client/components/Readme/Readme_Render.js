import React, { Component } from 'react';
import Markdown from 'react-remarkable';
import newReadme from './convert_readme_links.js';

class RenderMarkdown extends Component {
  render() {
    console.log(newReadme)
    return (
        <div>
          <Markdown source={ newReadme } />
        </div>
    );
  }
}

export default RenderMarkdown;
