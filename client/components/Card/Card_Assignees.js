import React, { Component } from 'react';
import { CardTitle } from 'react-toolbox/lib/card';


class CardAssignees extends Component {
  constructor(props) {
    super(props);

  }
  render () {
    return (
      <div>
        {props.assigneeData.map(assignee=>{
          return (
            <CardTitle
              avatar={assignee.avatar_url}
            />

          );
        }
      )
    }
    </div>
);
}
};

export default CardAssignees;
