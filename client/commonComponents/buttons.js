
import React, { Component } from 'react';
export const OpenProjectButton = (props) => {
  return (
    <div style={props.styles.buttonContainer}>
      <button style={props.styles.buttonText}>Hello Button</button>
    </div>
  )
}

export const OpenIssuesButton = (props) => {
  return (
    <div style={props.styles.buttonContainer}>
      <button style={props.styles.buttonText}>Hello Issues</button>
    </div>
  )
}
