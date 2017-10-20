import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class ModalIssueComment extends Component {

 render() {
   return (
     <div onClick={this.props.handleClick}>
     {
       this.props.state.isShowingModal &&
       <ModalContainer onClose={this.props.handleClose}>
         <ModalDialog onClose={this.props.handleClose}>

           <h3>Leave a comment on this issue</h3>
           <textarea style={{width:'100%', height: '75px'}}></textarea>
           <button className='btn btn-lg btn-success' onClick={this.props.handleAddComment}>Submit</button>
           <button className='btn btn-lg btn-danger' onClick={this.props.handleClose}> Cancel</button>
         </ModalDialog>

       </ModalContainer>
     }
   </div>
 );
 }
}
export default ModalIssueComment ;
