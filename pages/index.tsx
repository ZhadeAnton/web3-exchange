import Select from "@/components/select";
import useGetExchangeData from "@/hooks/useGetExchangeData";
import "tailwindcss/tailwind.css";

function HomePage() {
  const {
    tokenOne,
    tokenTwo,
    tokens,
    isTokensLoading,
    tokenOneAmount,
    tokenTwoAmount,
    handleChangeTokenValue,
    handleTokenOneSelect,
    handleTokenTwoSelect,
    handleSwitchTokens
  } = useGetExchangeData();

  return (
    <div className="bg-[#e4e4e7] h-full">
      <div>
        {isTokensLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </div>

      <div>
        {isTokensLoading || tokens === null || !tokenOne ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <Select
            onChange={handleTokenOneSelect}
            optionsList={tokens}
            token={tokenOne}
          />
        )}
      </div>

      <div>
        {isTokensLoading || tokens === null || !tokenTwo ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <Select
            onChange={handleTokenTwoSelect}
            optionsList={tokens}
            token={tokenTwo}
          />
        )}
      </div>

      <div>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={tokenOneAmount || ""}
          onChange={handleChangeTokenValue}
        />
      </div>
      <div>
        <input value={tokenTwoAmount || ""} disabled type="number" />
      </div>

      <div>
        <button onClick={handleSwitchTokens}>Switch</button>
      </div>
    </div>
  );
}

export default HomePage;
