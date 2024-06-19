import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card';
import styles from './Login.module.css';
import Button from '../UI/Button';
import { type } from '@testing-library/user-event/dist/type';

// 📌useReducer 리듀서 함수
/*
   이 컴포넌트의 모든 상태와 상태변경을 중앙제어하는 함수
  컴포넌트 내부 데이터를 사용하지 않고 상태에만 집중하므로
  컴포넌트 바깥쪽에 선언하는게 일반적입니다.

  param1 - state : 변경 전의 상태값
  param2 - action : dispatch함수(상태변경 등의 행동)가 전달한 상태변경객체
  return : 관리할 상태값들을 반환 = 변경 후의 상태값
*/
const emailReducer = (state, action) => {

  console.log('email reducer call !');
  console.log('state : ', state );   // 변경 전 상태객체
  console.log('action : ', action ); // 지금 상태변경이 일어난 값을 보내는 곳인 action
  
  if (action.type === 'USER_INPUT') {
    return {
      inputValue: action.val,
      isVaild: action.val.includes('@')
    };
  } else if (action.type === 'VALIDATE') {
    return {
      inputValue: state.inputValue,
      isVaild: state.inputValue.includes('@')
    }
  }
  // return {inputValue: action.val};   // 변경 후 상태객체
  // return {inputValue: action.val,
  //         isValid: state.val.includes('@')};  // 검증값 - 변경 전 값에 @ 포함 검증
};

const passwordReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {
      inputValue: action.val,
      isVaild: action.val.trim().length > 6
    };
  } else if (action.type === 'VALIDATE') {
    return {
      inputValue: state.inputValue,
      isVaild: state.inputValue.trim().length > 6
    };
  }
};

const Login = ({ onLogin }) => {

  // 로그인 한글자한글자에 리렌더링 반복된다
  //console.log('렌더링 수행 ~');

  // email reducer로 이메일 상태관리하기 !
  /*
     param1 - 위에서 만든 리듀서 함수
     param2 - 상태값의 초기값
     return - 리듀서를 관리하는 배열
         [0] : 이메일 관련 상태값
         [1] : 상태를 변경할 수 있는 함수
  */
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    inputValue: '',
    isValid: null
  });
  // console.log('abc : ', abc);
  console.log('변경 후 이메일 상태 : ', emailState);

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    inputValue: '',
    isValid: null
  });

  // 사용자가 입력한 이메일을 상태관리
  // const [enteredEmail, setEnteredEmail] = useState('');
  // 이메일 입력값이 정상인지 유무 확인
  // const [emailIsValid, setEmailIsValid] = useState();

  // 사용자가 입력한 패스워드를 상태관리
  // const [enteredPassword, setEnteredPassword] = useState('');
  // 패스워드 입력값이 정상인지 유무 확인
  // const [passwordIsValid, setPasswordIsValid] = useState();

  // 이메일, 패스워드가 둘 다 정상인지 확인
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (e) => {
    // setEnteredEmail(e.target.value);

    // reducer의 상태 변경은 반드시 dispatch함수를 통해 처리
    // dispatch 호출시 리듀서함수가 호출됨 !

    // param1 : 리듀서 함수의 action에 전달할 내용
    dispatchEmail({
      type: 'USER_INPUT',
      val: e.target.value
    });
  };

  const passwordChangeHandler = (e) => {
    // setEnteredPassword(e.target.value);

    dispatchPassword({
      type: 'USER_INPUT',
      val: e.target.value
    });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));

    dispatchEmail({
      type: 'VALIDATE'
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({
      type: 'VALIDATE'
    });
  };

  // 로그인 버튼을 눌렀을 때 이벤트 핸들러
  const submitHandler = (e) => {
    e.preventDefault();
    // App.js에서 받은 로그인핸들러 호출
    onLogin(emailState.inputValue, passwordState.inputValue);
  };

  // emailState와 passwordState에서 isValid 추출
  const {isVaild: emailIsValid} = emailState;
  const {isVaild: passwordIsValid} = passwordState;

  // ⭐ useEffect
  // 1. [] 빈 배열 존재시 최초 한 번만 호출된다.
  // 2. 배열을 비워둘 시 리렌더링될 때마다 반복 호출된다.
  // 3. props를 넣어 특정 배열 값을 넣어 그때만 반복 호출되도록 한다.
  useEffect(() => {

    // ⭐setTimeout 디바운싱 - 무한요청으로 과부하 막기 위한 시간 주기 !!
    const timer = setTimeout(() => {
      console.log('useEffect call in Login.js');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 1000);


    // ⭐디바운싱 처리로 마지막 요청된 하나만 가져오기 위해 clearTimeout 해주기
    // cleanup 함수는 컴포넌트가 업데이트되거나 사라지기 전에 실행
    return () => {
      // console.log('cleanup: ', enteredEmail);
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  //console.log('render: ', enteredEmail);

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            !emailIsValid ? styles.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.inputValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            !passwordIsValid ? styles.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.inputValue}
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