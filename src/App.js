import React, { Fragment, useState } from 'react';
import './App.css';
import AddUsers from './components/Users/AddUsers';
import UserList from './components/Users/UserList';


const App = () => {

  return (
    <>
      <AddUsers />
      <UserList />
    </>
  );
};

export default App;
