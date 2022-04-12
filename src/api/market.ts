import axios from 'axios';

export interface MarketItem {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface MarketListResponse {
  data: MarketItem[];
}

export async function apiGetMarketList(): Promise<MarketListResponse> {
  const response = await axios.get('https://api.upbit.com/v1/market/all');

  return response;
}
