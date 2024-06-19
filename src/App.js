// import React, { useRef, useState } from 'react';
// import './App.css';
// import AddUsers from './components/Users/AddUsers';
// import UserList from './components/Users/UserList';
// import ErrorModal from './components/UI/Modal/ErrorModal';

// const App = () => {

//   // 회원들이 저장될 배열
//   const [userList, setUserList] = useState([]);

//   const addUserHandler = user => {

//     console.log(user);
//     setUserList(prev => [
//       ...prev,
//       {
//         ...user,
//         id: Math.random().toString()
//       }
//     ]);
//   };

//   return (
//     <>
//       <AddUsers onAddUser={addUserHandler} />
//       <UserList users={userList} />
//     </>
//   );
// };

// export default App;

import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import MainHeader from "./components/SideEffect/MainHeader";
import Home from "./components/SideEffect/Home";
import Login from "./components/SideEffect/Login";
import AuthContext from "./store/auth-context";

const App = () => {
  // 현재 로그인 상태를 체크하는 변수
  const [isLoggedIn, setIsloggendIn] = useState(false);
  // console.log('로그인 검사 수행 !');

  // // loclaStrorage에서 login-flag 꺼냄
  // const storedLoginFlag = localStorage.getItem('login-flag');

  // // 로그인 검사를 초기에 수행
  // if (storedLoginFlag === '1') {
  //   // 상태변수가 setter로 변경되면 리액트는 변경감지 후 바로 리렌더링을 수행함
  //   setIsloggendIn(true);
  // }

  // side effect 처리를 위한 함수
  // useEffect는 기본적으로 컴포넌트 렌더링시 단 한번만 호출
  useEffect(() => {
    console.log("로그인 검사 수행!");
    const storedLoginFlag = localStorage.getItem("login-flag");
    if (storedLoginFlag === "1") {
      setIsloggendIn(true);
    }
  }, []);

  // 서버 통신은 중앙집중 관리가 중요함
  const loginHandler = (email, password) => {
    // 로그인의 증거로 클라이언트에 1이라는 숫자를 기록 (쿠키)
    localStorage.setItem("login-flag", "1");
    setIsloggendIn(true);
  };

  // 로그아웃 실행 함수
  const logoutHandler = () => {
    localStorage.removeItem("login-flag");
    setIsloggendIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <MainHeader />
      <main>
        {/* <Home /> */}
        {isLoggedIn && <Home />}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
      </main>
    </AuthContext.Provider>
  );
};

export default App;
