import React, { Component } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';

const languages = [
  { value: 'css', label: 'CSS' },
  { value: 'handlebars', label: 'Handlebars' },
  { value: 'html', label: 'HTML' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'Javascript' },
  { value: 'json', label: 'JSON' },
  { value: 'less', label: 'LESS' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'objective-c', label: 'Objective C' },
  { value: 'php', label: 'PHP' },
  { value: 'plaintext', label: 'Plaintext' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'sql', label: 'SQL' },
  { value: 'swift', label: 'Swift' },
  { value: 'typescript', label: 'Typescript' },
  { value: 'xml', label: 'XML' },
];


class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    state = {
      value: 'javascript',
    };
  }
  handleChange = (value) => {
    this.setState({ value });
    this.props.whatIsOurState();
  };
  render() {
    return (
      <Dropdown
        auto
        onChange={this.handleChange}
        source={languages}
        value={this.state.value}
      />
    );
  }
}

export default LanguageDropdown;
