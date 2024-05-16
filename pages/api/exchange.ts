import type { NextApiResponse } from "next";
import Moralis from "moralis";
import { IExchangeRequest } from "@/types/api/exchangeTypes";

export default async function handler(
  req: IExchangeRequest,
  res: NextApiResponse
) {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const addressOneResponse = await Moralis.EvmApi.token.getTokenPrice({
      address: req.query.addressOne || ""
    });

    const addressTwoResponse = await Moralis.EvmApi.token.getTokenPrice({
      address: req.query.addressTwo || ""
    });

    return res.status(200).json({
      tokenOne: addressOneResponse.raw.usdPrice,
      tokenTwo: addressTwoResponse.raw.usdPrice,
      ratio: addressOneResponse.raw.usdPrice / addressTwoResponse.raw.usdPrice
    });
  } catch (error) {
    console.error(error);
  }
}
