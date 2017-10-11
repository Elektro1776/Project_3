import React, { Component } from 'react';
import Markdown from 'react-remarkable';
import newReadme from './convert_readme_links.js';

class RenderMarkdown extends Component {
  render() {
    return (
        <div>
          <Markdown source={ newReadme } />
        </div>
    );
  }
}

export default RenderMarkdown;
