
import React from 'react';
import './App.css';
import ExpenseItem from './components/expenses/ExpenseItem';

const App = () => {

  return (
    <>
      <ExpenseItem title={"치킨먹음"} price={30000} date={new Date(2024, 6, 3)} />
      <ExpenseItem title="족발먹음" price={40000} date={new Date(2024, 6, 7)} />
      <ExpenseItem title="헬스장등록" price={300000} date={new Date(2024, 6, 12)} />
    </>
  );
}

export default App;
