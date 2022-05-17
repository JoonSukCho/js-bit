import React, { useEffect, useRef, useState } from 'react';
import Article from './Article';
import { useAppDispatch, useAppSelector } from 'store/config';
import { marketService } from 'services/market';
import { marketDayCandleSelector } from 'store/slices/marketSlice';

// echarts
import type { EChartsOption } from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CandlestickChart, LineChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { calculateMA } from 'utils/market';

/**
 * 캔들 보는법
 * 양봉 - 시작가가 종가보다 높은 경우
 * 음봉 - 시작가가 종가보다 낮은 경우
 * 꼬리 - 윗부분이 고가, 아랫부분이 저가
 *
 * [시가, 종가, 저가, 고가] 형태로 series data를 넣어주면 된다.
 */

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
  echarts.use([
    SVGRenderer,
    CandlestickChart,
    LineChart,
    TooltipComponent,
    GridComponent,
  ]);

  const [options, setOptions] = useState<EChartsOption>({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    yAxis: {},
    xAxis: {
      data: [],
    },
    grid: {
      containLabel: true,
    },
    series: [
      // 캔들
      {
        type: 'candlestick',
        name: 'candle',
        itemStyle: {
          color: '#c84a31',
          borderColor: '#c84a31',
          color0: '#1261c4',
          borderColor0: '#1261c4',
        },
      },
      // MA 15
      {
        name: 'MA15',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
          color: '#c84a31',
        },
        data: [],
      },
      // MA 50
      {
        name: 'MA50',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
        data: [],
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
      const sortedCandleData = [...dayCandles].reverse();
      const candleDate = sortedCandleData.map(
        (candle) => candle.candle_date_time_utc.split('T')[0],
      );
      const candlePrice = sortedCandleData.map((candle) => [
        candle.opening_price,
        candle.trade_price,
        candle.low_price,
        candle.high_price,
      ]);

      setOptions((prev) => ({
        ...prev,
        xAxis: {
          data: candleDate,
        },
        series: [
          {
            ...prev.series[0],
            data: candlePrice,
          },
          {
            ...prev.series[1],
            data: calculateMA(15, candlePrice),
          },
          {
            ...prev.series[2],
            data: calculateMA(50, candlePrice),
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
        <EChartsReactCore
          echarts={echarts}
          opts={{ renderer: 'svg' }}
          ref={chartRef}
          option={options}
          style={{ height: 600 }}
        />
      )}
    </div>
  );
};

export default CoinCharts;
