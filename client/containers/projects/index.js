import React, { Component } from 'react';
import ProjLayout from './Layout';
import ButtonBar from '../../components/ButtonBar/Button_Bar';
import styles from './project_style.css';
import CollaboratorsBar from '../../components/Collaborators';


class Projects extends Component {
    state = {
      issuesButt: false,
      readmeButt: true,
      matrixButt: false,
      codeButt: false

    };
    whatStateToChange(prop) {
      const keyArray = Object.keys(this.state);
      this.setState({
        issuesButt: false,
        readmeButt: false,
        matrixButt: false,
        codeButt: false
      });
      keyArray.map((key) => {
        if (key === prop) {
          this.setState({ [prop]: true });
        }
      });
    }
    render() {
      return (
        <div>
          <div>
            <CollaboratorsBar />
          </div>
          <div className={styles.buttonBox}>
            <ButtonBar clicker={this.whatStateToChange.bind(this)} />
          </div>
          <div>
            <ProjLayout state={this.state} />
          </div>
        </div>
      );
    }
}

export default Projects;
