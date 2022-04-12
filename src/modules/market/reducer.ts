import produce from 'immer';
import {
  MARKET_LIST_REQUEST,
  MARKET_LIST_SUCCESS,
  MARKET_LIST_FAILURE,
  MarketListState,
} from 'modules/market/types';
import { ActionRequest } from 'modules/market/actions';

export const initialState: MarketListState = {
  marketList: [],
  loading: false,
  error: '',
};

const market = (state: MarketListState = initialState, action: ActionRequest) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MARKET_LIST_REQUEST:
        draft.loading = true;
        break;
      case MARKET_LIST_SUCCESS:
        draft.loading = false;
        draft.marketList = action.payload.data;
        break;
      case MARKET_LIST_FAILURE:
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default market;
