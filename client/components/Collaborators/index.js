import React, { Component } from 'react';
import collabData from './collaborator_test_data';
import Chip from './Collab_Chip';

class Collaborators extends Component {
  render() {
  return (
    <div>
      <Chip collabs={collabData} />
    </div>
  );
}
};

export default Collaborators;