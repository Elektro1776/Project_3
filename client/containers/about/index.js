import React, { Component } from 'react';
import styles from "../about/about.css";


class About extends Component {

  render() {
    return (

      <div className="container">

        <div className={`col-lg-3`}></div>

        <div className={`col-lg-6 ${styles.backgroundHelper}`} style={{color:'white'}}>

          <h3> About uTile </h3>

          <hr></hr>

          <p>uTile was designed as an application that should help users streamline managin multiple applications in the GitHub environment.  Once you authorize this application to be connected with your GitHub account you can create/assign/close issues, assign issues to other collaborators, view readme files, use our Matrix to prioritize tasks, and write live code ont eh fly all in one location.  This site isa  work in progress and we are hoping that we will be able to increase the level of collaboration as time goes on.</p>

          <p>If you have ideas or are interested in contributing please visit us on <a href='https://github.com/Elektro1776/Project_3'>Github</a></p>

          <br />

          <p><strong>- The uTile Team</strong></p>

          <p><strong>Collaborators: Ben Cherais, Chelsea Mitchell, Austin Reynolds & David Hammond</strong></p>

          <img className={styles.loader} src="./images/utile.gif" alt="loader" />
        </div>


      </div>
    );
  }
}

export default About;
