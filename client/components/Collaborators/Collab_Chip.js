import React from 'react';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';

const ChipCard = (props) => (
  <div>
    <Chip>
      <Avatar><img src="https://placeimg.com/80/80/animals"/></Avatar>
      <span>Image contact chip</span>
    </Chip>
  </div>
);

export default ChipCard;
