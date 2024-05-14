import { NextApiRequest } from "next";

export interface IExchangeRequest extends NextApiRequest {
  query: Partial<{
    [key: string]: string | string[];
    addressOne: string;
    addressTow: string;
  }>;
}

export interface IExchangeResponse {
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
  tokenDecimals: string;
  nativePrice: {
    value: string;
    decimals: number;
    name: string;
    symbol: string;
    address: string;
  };
  usdPrice: number;
  usdPriceFormatted: string;
  exchangeName: string;
  exchangeAddress: string;
  tokenAddress: string;
  priceLastChangedAtBlock: string;
  verifiedContract: boolean;
}
