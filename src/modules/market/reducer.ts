import produce from 'immer';
import {
  LOAD_MARKET_LIST_REQUEST,
  LOAD_MARKET_LIST_SUCCESS,
  LOAD_MARKET_LIST_FAILURE,
  MarketState,
  LOAD_MARKET_MIN_CANDLE_REQUEST,
  LOAD_MARKET_MIN_CANDLE_SUCCESS,
  LOAD_MARKET_MIN_CANDLE_FAILURE,
} from 'modules/market/types';
import { ActionRequest } from 'modules/market/actions';
import { MarketMinuteCandle } from 'api/types/market';

export const initialState: MarketState = {
  marketList: [],
  loadMarketListLoading: false,
  loadMarketListDone: false,
  loadMarketListError: '',

  marketMinCandle: [] as MarketMinuteCandle,
  loadMarketMinCandleLoading: false,
  loadMarketMinCandleDone: false,
  loadMarketMinCandleError: '',
};

const market = (state: MarketState = initialState, action: ActionRequest) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MARKET_LIST_REQUEST:
        draft.loadMarketListLoading = true;
        draft.loadMarketListDone = false;
        break;
      case LOAD_MARKET_LIST_SUCCESS:
        draft.loadMarketListLoading = false;
        draft.loadMarketListDone = true;
        draft.marketList = action.payload.data;
        break;
      case LOAD_MARKET_LIST_FAILURE:
        draft.loadMarketListLoading = false;
        draft.loadMarketListError = action.payload.error;
        break;

      case LOAD_MARKET_MIN_CANDLE_REQUEST:
        draft.loadMarketMinCandleLoading = true;
        draft.loadMarketMinCandleDone = false;
        break;
      case LOAD_MARKET_MIN_CANDLE_SUCCESS:
        draft.loadMarketMinCandleLoading = false;
        draft.loadMarketMinCandleDone = true;
        draft.marketMinCandle = action.payload.data;
        break;
      case LOAD_MARKET_MIN_CANDLE_FAILURE:
        draft.loadMarketMinCandleLoading = false;
        draft.loadMarketMinCandleError = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default market;
