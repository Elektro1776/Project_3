import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import styles from './button_styles.css';
const ButtonBar = (props) => {
  return (
    <div>
      <Button className={styles.buttonChoice} onClick={()=>props.clicker('readmeButt')} label='Readme' />
      <Button className={styles.buttonChoice} onClick={()=>props.clicker('issuesButt')} label='Issues' />
      <Button className={styles.buttonChoice} onClick={()=>props.clicker('matrixButt')} label='Matrix' />
      <Button className={styles.buttonChoice} onClick={()=>props.clicker('codeButt')} label='Code Editor' />
    </div>
  );
}

export default ButtonBar;
