import React from 'react';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import styles from './collab.css';

const ChipCard = (props) => (
  <div className={styles.container}>
    {props.collabs.map((collab)=>{
      return (
        <div key={collab.id} className={styles.child}>
          <Chip className={styles.background}>
            <Avatar><img src={collab.avatar_url}/></Avatar>
            <a href={collab.html_url} alt={collab.login}><span>{collab.login}</span></a>
          </Chip>
        </div>
      );
    })}

  </div>
);

export default ChipCard;
