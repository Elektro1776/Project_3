import React, { Component } from 'react';
import { CardText } from 'react-toolbox/lib/card';



class CardComments extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        { this.props.comments.map((comment)=>{
          return (

            <CardText>
              <h6>{'Comment by ' + comment.user.login + ' at ' + comment.created_at}</h6>
              <p>{comment.body}</p>
            </CardText>

          );
        }

      )
    }
  </div>
);
}
}

export default CardComments;
