import React from 'react';
import './App.css';
import ExpenseList from './components/expenses/ExpenseList';
import Counter from './components/practice/Counter';

const App = () => {

  // 서버에서 지출항목 JSON 배열을 응답받음
  const expenses = [
    {
      title: '치킨먹음',
      price: 30000,
      date: new Date(2024, 6 - 1, 3)
    },
    {
      title: '족발먹음',
      price: 40000,
      date: new Date(2024, 6 - 1, 7)
    },
    {
      title: '헬스장등록',
      price: 300000,
      date: new Date(2024, 6 - 1, 12)
    },
  ];

  return (
    <>
      <Counter />
      <ExpenseList expenses={expenses} />
    </>
  );
};

export default App;
