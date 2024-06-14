import React from 'react';
import Chart from './Chart';

const ExpenseChart = ({ expenses }) => {

  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  /*
    - 해당 연도의 모든 지출데이터배열에서 월별로 지출액을 합산하여
      chartDataPoints배열에 value값에 누적 저장
  */

  expenses.forEach(exp => {
    // 지출액을 추출해서 chartDataPoints배열에 해당 월에 value에 합산
    // 지출액
    const expensePrice = exp.price;
    const expenseMonth = exp.date.getMonth();

    chartDataPoints[expenseMonth].value += expensePrice;
  });

  // console.log('cdp: ', chartDataPoints);

  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpenseChart;
