import { IExchangeResponse } from "@/types/api/exchangeTypes";
import { useEvmNativeBalance } from "@moralisweb3/next";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [data, setData] = useState<IExchangeResponse | null>(null);

  const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const { data: nativeBalance } = useEvmNativeBalance({ address });

  useEffect(() => {
    const handleFetch = async () => {
      const response = await axios.get<any, IExchangeResponse>(
        "/api/exchange?addressOne=0xdac17f958d2ee523a2206206994597c13d831ec7"
      );
      setData(response);
    };
    handleFetch();
  }, []);

  console.log("data", data);

  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
    </div>
  );
}

export default HomePage;
