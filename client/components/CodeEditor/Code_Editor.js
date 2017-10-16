import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

class CodeEditor extends Component {
  constructor(props) {
  super(props);
  this.state = {
    code: '// type your code...',
  }
}
editorDidMount(editor, monaco) {
  const retrievedObject = localStorage.getItem('CodeEditorPreviousState');
  const previousCode = JSON.parse(retrievedObject);
  this.setState({ code: previousCode })
  editor.focus();
}
onChange(newValue, e) {
  console.log('onChange', newValue, e);
  function localStore (state) {
    localStorage.setItem('CodeEditorPreviousState', JSON.stringify(state));

};
localStore(newValue);
}
render() {
  const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        vs: 'http://localhost:8080/dist/vs',
      },
    };
  const code = this.state.code;
  const options = {
    selectOnLineNumbers: true
  };
  // console.log(this.props.currentLanguageState, 'should be language');
  console.log(this.state.code, 'here is my code state');
  return (
    <div>
      <MonacoEditor
        width="100%"
        height="600"
        language={this.props.currentLanguageState}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={::this.onChange}
        editorDidMount={::this.editorDidMount}
        requireConfig={requireConfig}
      />
    </div>
  );
}
}

export default CodeEditor;
