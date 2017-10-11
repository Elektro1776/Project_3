import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import styles from '../../components/LoginForm/LoginForm.css'
// import image from '../../assets/utile.png'

class Login extends Component {

  render() {
    return (


      <div className={styles.wrapper}>


         <img src={require("../../components/LoginForm/utile.png")} className={styles.img}/>

        <div className={styles.box}>
          <LoginForm />
        </div>

      </div>
    );
  }
}

export default Login;
