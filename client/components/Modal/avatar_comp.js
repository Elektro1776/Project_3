import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';


class AvatarComp extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
            <Avatar
            src={this.props.collab.avatar_url}
            size={30}
            // style={{ margin: 5 }}
          />
          </MuiThemeProvider>
          <span style={{marginLeft: 3}}>{this.props.collab.login}</span>
      </div>
    );
  }
}

export default AvatarComp;
