import { NextApiRequest } from "next";

export interface IExchangeRequest extends NextApiRequest {
  query: Partial<{
    [key: string]: string | string[];
    addressOne: string;
    addressTwo: string;
  }>;
}

export interface IExchangeResponse {
  tokenOne: number;
  tokenTwo: number;
  ratio: number;
}
