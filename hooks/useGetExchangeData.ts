import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IExchangeResponse } from "@/types/api/exchangeTypes";
import useGetTokensList from "./useGetTokensList";
import { IToken } from "@/types/api/tokensTypes";

const useGetExchangeData = () => {
  const [isExchangeLoading, seIsExchangeLoading] = useState(false);
  const [tokenOneAddress, setTokenOneAddress] = useState<string | null>(null);
  const [tokenTwoAddress, setTokenTwoAddress] = useState<string | null>(null);
  const [tokenOneAmount, setTokenOneAmount] = useState<number | null>(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<number | null>(null);
  const [tokenOne, setTokenOne] = useState<IToken | null>(null);
  const [tokenTwo, setTokenTwo] = useState<IToken | null>(null);
  const [prices, setPrices] = useState<IExchangeResponse | null>(null);
  const { tokens, isTokensLoading } = useGetTokensList();

  const handleFetchPrices = useCallback(async () => {
    if (!tokenOneAddress || !tokenTwoAddress) return;

    const response = await axios.get(`/api/exchange`, {
      params: { addressOne: tokenOneAddress, addressTwo: tokenTwoAddress }
    });
    const { tokenOne, tokenTwo } = response as unknown as IExchangeResponse;
    setPrices(response.data as IExchangeResponse);
    setTokenOneAmount(tokenOne);
    setTokenTwoAmount(tokenTwo);
  }, [tokenOneAddress, tokenTwoAddress]);

  const handleChangeTokenValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTokenOneAmount(Number(value));
      if (value && prices) {
        const calcValue = (Number(value) * prices.ratio).toFixed(2);
        setTokenTwoAmount(Number(calcValue));
      }
    },
    [prices]
  );

  const handleTokenOneSelect = useCallback(
    (tokenAddress: string) => {
      setTokenOneAddress(tokenAddress);
      const token = tokens?.find((item) => item.address === tokenAddress);
      if (token) {
        setTokenOne(token);
      }
    },
    [tokens]
  );

  const handleTokenTwoSelect = useCallback(
    (tokenAddress: string) => {
      setTokenTwoAddress(tokenAddress);
      const token = tokens?.find((item) => item.address === tokenAddress);
      if (token) {
        setTokenTwo(token);
      }
    },
    [tokens]
  );

  const handleSwitchTokens = useCallback(() => {
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    setPrices(null);
    setTokenOneAmount(tokenTwoAmount);
    setTokenTwoAmount(tokenOneAmount);
  }, [tokenOneAmount, tokenTwoAmount]);

  useEffect(() => {
    if (tokens) {
      setTokenOneAddress(tokens[0].address);
      setTokenOne(tokens[0]);
      setTokenTwoAddress(tokens[1].address);
      setTokenTwo(tokens[1]);
    }
  }, [tokens]);

  useEffect(() => {
    console.log("handleFetchPrices");
    // handleFetchPrices();
  }, [handleFetchPrices]);

  return {
    tokenOne,
    tokenTwo,
    tokens,
    prices,
    isTokensLoading,
    tokenOneAmount,
    tokenTwoAmount,
    isExchangeLoading,
    handleChangeTokenValue,
    handleTokenOneSelect,
    handleTokenTwoSelect,
    handleSwitchTokens
  };
};

export default useGetExchangeData;
