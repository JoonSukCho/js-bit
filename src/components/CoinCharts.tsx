import React, { useEffect, useRef, useState } from 'react';
import { EChartOption } from 'echarts';
import ECharts from 'echarts-for-react';
import Article from './Article';
import { useAppDispatch, useAppSelector } from 'store/config';
import { marketService } from 'services/market';
import { marketDayCandleSelector } from 'store/slices/marketSlice';

/**
 * 캔들 보는법
 * 양봉 - 시작가가 종가보다 높은 경우
 * 음봉 - 시작가가 종가보다 낮은 경우
 * 꼬리 - 윗부분이 고가, 아랫부분이 저가
 *
 * [시가, 종가, 저가, 고가] 형태로 series data를 넣어주면 된다.
 */

const xAxisFakeData = (() => {
  const data = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    data.push(`${year}-${month}-${day}`);
    now.setDate(now.getDate() + 1);
  }

  return data;
})();

const seriesFakeData = (() => {
  const data = [];

  for (let i = 0; i < 100; i++) {
    const series = [];

    for (let j = 0; j < 4; j++) {
      series.push(Math.floor(Math.random() * 50));
    }

    data.push(series);
  }

  return data;
})();

const CoinCharts = () => {
  const dispatch = useAppDispatch();
  const selectedMarket = useAppSelector(
    (state) => state.market.selectedMarket.market,
  );
  const {
    dayCandles,
    loadDayCandlesDone,
    loadDayCandlesError,
    loadDayCandlesLoading,
  } = useAppSelector(marketDayCandleSelector);

  const chartRef = useRef(null);
  const [options, setOptions] = useState<EChartOption>({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    yAxis: {},
    xAxis: {
      data: xAxisFakeData,
    },
    series: [
      {
        type: 'candlestick',
        data: seriesFakeData,
      },
    ],
  });

  useEffect(() => {
    if (selectedMarket.length > 0) {
      dispatch(
        marketService.getMarketDayCandle({
          market: selectedMarket,
          count: 100,
        }),
      );
    }
  }, [selectedMarket]);

  useEffect(() => {
    if (loadDayCandlesDone) {
      //
      const sortedCandleData = [...dayCandles].reverse();

      setOptions((prev) => ({
        ...prev,
        xAxis: {
          data: sortedCandleData.map((candle) => candle.candle_date_time_utc),
        },
        series: [
          {
            type: 'candlestick',
            data: sortedCandleData.map((candle) => [
              candle.opening_price,
              candle.trade_price,
              candle.low_price,
              candle.high_price,
            ]),
          },
        ],
      }));
    }
  }, [loadDayCandlesDone]);

  return (
    <div>
      {loadDayCandlesLoading ? (
        <div>loading...</div>
      ) : (
        <ECharts ref={chartRef} option={options} style={{ height: 600 }} />
      )}
    </div>
  );
};

export default CoinCharts;
