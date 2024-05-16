import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { IToken } from "@/types/api/tokensTypes";

const useGetTokensList = () => {
  const [tokens, setTokens] = useState<IToken[] | null>(null);
  const [isTokensLoading, setIsTokensLoading] = useState(false);

  useEffect(() => {
    const handleFetch = async () => {
      setIsTokensLoading(true);
      const response = await axios.get("/api/tokensLits");

      const resArray = [];
      for (const [, value] of Object.entries(response.data)) {
        resArray.push(value as IToken);
      }

      setTokens(resArray);
      setIsTokensLoading(false);
    };
    handleFetch();
  }, []);

  return { isTokensLoading, tokens };
};

export default useGetTokensList;
