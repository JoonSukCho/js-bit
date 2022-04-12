import produce from 'immer';
import {
  MARKET_REAL_TIME_CONNECT,
  MARKET_REAL_TIME_SUCCESS,
  MARKET_REAL_TIME_FAILURE,
  MarketRealTimeState,
} from 'modules/realtimeMarket/types';
import { ActionRequest } from 'modules/realtimeMarket/actions';

export const initialState: MarketRealTimeState = {
  realTimeData: [],
  connection: false,
  error: '',
};

const realtimeMarket = (
  state: MarketRealTimeState = initialState,
  action: ActionRequest,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MARKET_REAL_TIME_CONNECT:
        draft.connection = false;
        break;
      case MARKET_REAL_TIME_SUCCESS:
        draft.connection = true;
        draft.realTimeData = action.payload.response;
        break;
      case MARKET_REAL_TIME_FAILURE:
        draft.connection = false;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default realtimeMarket;
