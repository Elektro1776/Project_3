import React, { Component } from 'react';
// import LangSelector from './language_dropdown';
// import EditorField from './Code_Editor';
import MonacoEditor from 'react-monaco-editor';

class CodeEditor extends Component {
  constructor(props) {
  super(props);
  this.state = {
    code: '// type your code...',
  }
}
editorDidMount(editor, monaco) {
  console.log('editorDidMount', editor);
  editor.focus();
}
onChange(newValue, e) {
  console.log('onChange', newValue, e);
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
  return (
    <div>
      <div>Hello Editor</div>
      <MonacoEditor
        width="400"
        height="600"
        language="javascript"
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
