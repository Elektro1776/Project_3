import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import styles from './modal_styles.css';

class ModalGitAuth extends Component {
  state = {
   isShowingModal: false,
 }
 componentDidMount = () => this.props.authorized ? this.setState({ isShowingModal:false }) : this.setState({ isShowingModal: true });
 handleClick = () => this.setState({isShowingModal: true})
 handleClose = () => this.setState({isShowingModal: false})
 render() {
   return (
     <div onClick={this.handleClick}>
     {
       this.state.isShowingModal &&
       <ModalContainer onClose={this.handleClose}>
         <ModalDialog onClose={this.handleClose}>
           
           <h1 className={styles.modalText}>Github Authorization</h1>
           <p className={styles.modalText}>To get the full uTile experience you need to authorize us on GitHub.</p>
           <button className='btn btn-lg btn-success' onClick={this.props.authorize}><img className={styles.authImage} src='https://assets-cdn.github.com/images/modules/logos_page/Octocat.png' /> Authorize GitHub Now</button>
           <button className='btn btn-lg btn-danger' onClick={this.handleClose}> Cancel</button>
         </ModalDialog>

       </ModalContainer>
     }
   </div>
 );
 }
}
export default ModalGitAuth;
