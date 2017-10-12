import React from 'react';
import { Card, CardTitle } from 'react-toolbox/lib/card';
import styles from './issueCards.css';

const DropdownTrigger = (props) => (
  <Card  className={styles.childDrop}>
    <CardTitle
      title={`${props.issueTitle} #${props.issueNumber}`}
    />
  </Card>

);

export default DropdownTrigger;
