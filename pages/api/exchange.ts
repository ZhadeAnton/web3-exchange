import type { NextApiResponse } from "next";
import Moralis from "moralis";
import { IExchangeRequest } from "@/types/api/exchangeTypes";
import { GetTokenPriceResponseAdapter } from "moralis/common-evm-utils";

export default async function handler(
  req: IExchangeRequest,
  res: NextApiResponse<GetTokenPriceResponseAdapter>
) {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: req.query.addressOne || ""
    });

    console.log(response);
    res.json(response);
    return response.raw;
  } catch (error) {
    console.error(error);
  }
}
