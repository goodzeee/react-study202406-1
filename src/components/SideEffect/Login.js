import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import styles from './Login.module.css';
import Button from '../UI/Button';

const Login = ({ onLogin }) => {

  // 로그인 한글자한글자에 리렌더링 반복된다
  //console.log('렌더링 수행 ~');
  // 사용자가 입력한 이메일을 상태관리
  const [enteredEmail, setEnteredEmail] = useState('');
  // 이메일 입력값이 정상인지 유무 확인
  const [emailIsValid, setEmailIsValid] = useState();
  // 사용자가 입력한 패스워드를 상태관리
  const [enteredPassword, setEnteredPassword] = useState('');
  // 패스워드 입력값이 정상인지 유무 확인
  const [passwordIsValid, setPasswordIsValid] = useState();

  // 이메일, 패스워드가 둘 다 정상인지 확인
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);

  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);

  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  // 로그인 버튼을 눌렀을 때 이벤트 핸들러
  const submitHandler = (e) => {
    e.preventDefault();
    // App.js에서 받은 로그인핸들러 호출
    onLogin(enteredEmail, enteredPassword);
  };

  // ⭐ useEffect
  // 1. [] 빈 배열 존재시 최초 한 번만 호출된다.
  // 2. 배열을 비워둘 시 리렌더링될 때마다 반복 호출된다.
  // 3. props를 넣어 특정 배열 값을 넣어 그때만 반복 호출되도록 한다.
  useEffect(() => {

    // ⭐setTimeout 디바운싱 - 무한요청으로 과부하 막기 위한 시간 주기 !!
    const timer = setTimeout(() => {
      console.log('useEffect call in Login.js');
      setFormIsValid(
        enteredPassword.trim().length > 6 && enteredEmail.includes('@')
      );
    }, 2000);

    // ⭐디바운싱 처리로 마지막 요청된 하나만 가져오기 위해 clearTimeout 해주기
    // cleanup 함수는 컴포넌트가 업데이트되거나 사라지기 전에 실행
    return () => {
      clearTimeout(timer);
      //console.log('cleanup: ', enteredEmail);
    };
  }, [enteredEmail, enteredPassword]);

  //console.log('render: ', enteredEmail);

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button
            type="submit"
            className={styles.btn}
            disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;