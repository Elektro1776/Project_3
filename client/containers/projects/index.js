import React, { Component } from 'react';
import ProjLayout from './Layout';
import ButtonBar from '../../components/ButtonBar/Button_Bar';
import styles from './project_style.css';
import CollaboratorsBar from '../../components/Collaborators';
import { connect } from 'react-redux';

class Projects extends Component {
    state = {
      issuesButt: false,
      readmeButt: true,
      matrixButt: false,
      codeButt: false,
      currentProject: null,
      currentScreen: 'readmeButt',
    };
    componentWillReceiveProps(nextProps) {
      // console.log("this should show projects connected in state", nextProps.currentProject);
      const { currentProject } = nextProps;
      if (currentProject.length !== 0 && currentProject.id !== this.props.currentProject.id) {
        this.setState({ currentProject });
      }
    }
    whatStateToChange(prop) {
      this.setState({ currentScreen: prop });
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.currentProject !== this.state.currentProject) {
        return true;
      }
      if (nextState.currentScreen !== this.state.currentScreen) {
        return true;
      }
      return false;
    }
    render() {
      const { currentProject } = this.state;
      if (currentProject !== null) {
        return (
          <div>
            <div>
              <CollaboratorsBar repoName={currentProject.name} currentUser={currentProject.owner.login} />
            </div>
            <div className={styles.buttonBox}>
              <ButtonBar clicker={this.whatStateToChange.bind(this)} />
            </div>
            <div>
              <ProjLayout currentScreen={this.state.currentScreen} repoName={currentProject.name} currentUser={currentProject.owner.login} />
            </div>
          </div>
        );
      }
      return (
        <div className={styles.loaderDiv}>
          <img src='https://raw.githubusercontent.com/Elektro1776/Project_3/development/client/components/Card/uTile_black_loader_50.gif' alt='loader' className={styles.loaderImage} />
        </div>
      );
    }
}

export default connect((state) => ({
  currentProject: state.repos.currentProject,
}), null)(Projects);
