import React from 'react';
import { CardTitle } from 'react-toolbox/lib/card';
import styles from './cardAssignees.css';

const CardAssignees = (props) => {
  if (props.assigneesData[props.indexValue].length === 0) {
    return <div style={{'marginLeft': 15}}>None Currently</div>;
  }
  return (
    <div className={styles.mainCont} >
      { props.assigneesData[props.indexValue].map((assignee, i) => (
        <div key={assignee.id}>
          <img className={`${styles.avatarFix} pull-left`} src={assignee.avatar_url} alt='user' />
        </div>
      ))}
    </div>
  );
};


export default CardAssignees;
