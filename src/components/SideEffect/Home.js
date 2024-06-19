import React, { useContext } from 'react';

import Card from '../UI/Card';
import styles from './Home.module.css';
import Button from '../UI/Button';
import AuthContext from '../../store/auth-context';

const Home = () => {

  const ctx = useContext(AuthContext);
  console.log('ctx : ', ctx);

  // Consumer, Provider 대신하여 심플하게 사용할 수 있는 useContext !
  return (
            <Card className={styles.home}>
              <h1>Welcome back!</h1>
              <Button onClick={ctx.onLogout}>Logout</Button>
            </Card>
  
  // return (
  //   <AuthContext.Consumer>
  //     {(ctx) => {
  //       console.log('ctx: ', ctx);
  //       return (
  //         <Card className={styles.home}>
  //           <h1>Welcome back!</h1>
  //           <Button onClick={ctx.onLogout}>Logout</Button>
  //         </Card>
  //       );
  //     }}
  //   </AuthContext.Consumer>
  // );
  )
};

export default Home;
