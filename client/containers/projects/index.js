import React, { Component } from 'react';
import ProjLayout from './Layout';
import ButtonBar from '../../components/ButtonBar/Button_Bar';
import styles from './project_style.css';

class Projects extends Component {
    state = {
      issuesButt: false,
      readmeButt: true,
      matrixButt: false,

    };
    whatStateToChange(prop) {
      const keyArray = Object.keys(this.state);
      this.setState({
        issuesButt: false,
        readmeButt: false,
        matrixButt: false,
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

// function mapStateToProps (state) {
//  issueData:
// }

// export default connect(mapStateToProps, { fetchIssues })(Projects);


export default Projects;
