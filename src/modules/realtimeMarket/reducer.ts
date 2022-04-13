import produce from 'immer';
import {
  CONNECT_REAL_TIME_MARKET_REQUEST,
  CONNECT_REAL_TIME_MARKET_SUCCESS,
  CONNECT_REAL_TIME_MARKET_FAILURE,
  RealtimeMarketState,
} from 'modules/realtimeMarket/types';
import { ActionRequest } from 'modules/realtimeMarket/actions';

export const initialState: RealtimeMarketState = {
  realTimeMarket: [],
  connection: false,
  error: '',
};

const realtimeMarket = (
  state: RealtimeMarketState = initialState,
  action: ActionRequest,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONNECT_REAL_TIME_MARKET_REQUEST:
        draft.connection = false;
        break;
      case CONNECT_REAL_TIME_MARKET_SUCCESS:
        draft.connection = true;
        draft.realTimeMarket = action.payload.data;
        break;
      case CONNECT_REAL_TIME_MARKET_FAILURE:
        draft.connection = false;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default realtimeMarket;
