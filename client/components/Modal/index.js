import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import styles from './modal_styles.css';

class ModalGitAuth extends Component {
  state = {
    isShowingModal: false,
  }
componentDidMount = () => this.props.authorized ? this.setState({ isShowingModal: false }) : this.setState({ isShowingModal: true });
handleClick = () => {
  this.setState({ isShowingModal: true });
}
handleClose = () => this.setState({ isShowingModal: false })
render() {
  return (
    <div>
      {
        this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <h1 className={styles.modalText}>Github Authorization</h1>
            <p className={styles.modalText}>To get the full uTile experience you need to authorize us on GitHub.</p>
            <a href="https://github.com/login/oauth/authorize?client_id=2844a39a5f2a7df1d0cb&scope=repo&user">
              <button
                className="btn btn-lg btn-success"
                type="reset"
                // onClick={this.props.authorizeMe}
              >
                <img
                  alt="Github"
                  className={styles.authImage}
                  src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png"
                />
                Authorize GitHub Now
              </button>
            </a>
            <button className="btn btn-lg btn-danger" onClick={this.handleClose}> Cancel</button>
          </ModalDialog>
        </ModalContainer>
      }
    </div>
  );
}
}
export default ModalGitAuth;
