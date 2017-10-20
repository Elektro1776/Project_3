import React, { Component } from 'react';
import styles from "../about/about.css";


class About extends Component {

  render() {
    return (

      <div className="container">

        <div className="col-lg-3"></div>

        <div className="col-lg-6">

          <h3> About uTile </h3>

          <hr></hr>

          <p>"Bootcamps are always fun", said no one, ever. Bootcamps are stressful
        and made to test if you really have what it takes to make it as a developer.
        While trying to master many different languages you'll also be tasked with
        trying to keep yourself organized, which for some is a huge task on its own.
        Throughout this process two noobs (and two code wizards) got together to come
        up with a solution on how to help an everyday bootcamper stay organized and truly
        succced while kicking some coding ass.</p>

          <p><strong> Bootcamper meet uTile.</strong></p>

          <p>uTile is an app that allows the user to stay on top of the many
        projects and homeworks that will arise along the course of the camp through Github
        integration. Along with helping you stay organized it also helps with learning workflow
        and how to better prioritize your tasks with a priority matrix. It is all
        about streamlining the process and setting you up for long term success.</p>

          <p>So before you throw out your computer because you missed a semi-colon, think uTile.</p>

          <br />

          <p><strong>- The uTile Team</strong></p>


        </div>


      </div>
    );
  }
}

export default About;
