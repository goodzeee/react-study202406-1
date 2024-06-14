import React from 'react';
import ChartBar from './ChartBar';
import './Chart.css';

const Chart = ({ dataPoints }) => {
  console.log('dataPoints: ', dataPoints);

  /*
    dataPoints배열에서 12개 요소의 value를 합산하여 연도 지출총액을 계산
    그리고 각 ChartBar에 해당월지출총액 / 연도지출총액 비율을 전달
  */


    // 1년치 총액
    const totalValue = dataPoints
                        .map(dp => dp.value)
                        .reduce((accum, curr) => accum + curr, 0)
                        ;
                        
    // console.log(totalValue);


  return (
    <div className="chart">
      {dataPoints.map((dp) => (
        <ChartBar
          key={dp.label}
          label={dp.label}
          currentMonthValue={dp.value}
          totalValue={totalValue}
        />
      ))}
    </div>
  );
};

export default Chart;
