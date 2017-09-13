/*
    ./client/components/App.jsx
*/
import React from 'react';
import { OpenProjectButton, OpenIssuesButton } from '../commonComponents/buttons';
import { projectButtonStyles } from '../themes/buttonsStyles';
const styles = {
  color: 'red',
  fontSize: 10,
}
const App = () =>
  (
    <div style={{ textAlign: 'center' }}>
      <h1
        style={styles}>Hello uTile! Fuckkkk
      </h1>
      <OpenProjectButton
        styles={projectButtonStyles}
      />
      <OpenIssuesButton
        styles={projectButtonStyles}
      />
    </div>
  );

export default App;
