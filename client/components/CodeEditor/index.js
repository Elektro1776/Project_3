import React, { Component } from 'react';
import LangSelector from './Language_Dropdown';
import EditorField from './Code_Editor';


class CodeEditorParent extends Component {
  constructor(props) {
  super(props);
  this.state = {
    currentLanguage: ''
  };
  this.whatIsOurState = this.whatIsOurState.bind(this);
}
whatIsOurState(propVal) {
  this.setState({ currentLanguage: propVal });
}
render() {
  return (
    <div>
    {/* <LangSelector passState={this.whatIsOurState} /> */}
    <EditorField currentState={this.state.currentLanguage} />
    </div>
  );
}
}

export default CodeEditorParent;
