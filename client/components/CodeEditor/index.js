import React, { Component } from 'react';
import LanguageDropdown from './Language_Dropdown';
import EditorField from './Code_Editor';


class CodeEditorParent extends Component {
  state = {
    currentLanguage: 'javascript'
  };

whatIsOurState(propVal) {
  this.setState({ currentLanguage: propVal });
}
render() {
  return (
    <div>
    <LanguageDropdown handleParentStateChange={this.whatIsOurState.bind(this)} />
    <EditorField currentLanguageState={this.state.currentLanguage} />
    </div>
  );
}
}

export default CodeEditorParent;
