import React, { Component } from 'react';
import ProjLayout from './Layout';
import ButtonBar from '../../components/ButtonBar/Button_Bar';
import styles from './project_style.css';
import CollaboratorsBar from '../../components/Collaborators';

const repoName = 'funRepoCreatedByPostMan';
import { connect } from 'react-redux';

const currentUser = '901david';

class Projects extends Component {
    state = {
      issuesButt: false,
      readmeButt: true,
      matrixButt: false,
      codeButt: false,
      currentProject: null,
    };
    componentWillReceiveProps(nextProps) {
      // console.log("this should show projects connected in state", nextProps.currentProject);
      const { currentProject } = nextProps;
      // console.log(' WHAT IS USER CURRENT PROJECT', currentProject);
      if (currentProject.length !== 0) {
        this.setState({ currentProject });
      }
    }
    whatStateToChange(prop) {
      const keyArray = Object.keys(this.state);
      this.setState({
        issuesButt: false,
        readmeButt: false,
        matrixButt: false,
        codeButt: false,
      });
      keyArray.map((key) => {
        if (key === prop) {
          this.setState({ [prop]: true });
        }
      });
    }
    render() {
      const { currentProject } = this.state;
      if (currentProject !== null) {
        // console.log('here is current proj in IF statement', currentProject);
        return (
          <div>
            <div>
              <CollaboratorsBar repoName={currentProject.name} currentUser={currentProject.owner.login} />
            </div>
            <div className={styles.buttonBox}>
              <ButtonBar clicker={this.whatStateToChange.bind(this)} />
            </div>
            <div>
              <ProjLayout state={this.state} repoName={currentProject.name} currentUser={currentProject.owner.login} />
            </div>
          </div>
        );
      }
      return (
        <div>
          <div className={styles.loaderContainerTwo}>
            <img className={`center-block ${styles.loaderImageTwo}`} src="./images/uTile_black_loader_100.gif" alt="loader" />
            <h1 className={styles.loaderTextTwo}>Loading...</h1>
          </div>
        </div>
      );
    }
}

export default connect((state) => ({
  currentProject: state.repos.currentProject,
}), null)(Projects);
