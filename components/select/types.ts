import { ChangeEvent } from "react";
import { IToken } from "@/types/api/tokensTypes";

export interface ISelectProps {
  onChange: (tokenAddress: string) => void;
  optionsList: IToken[];
  token: IToken | null;
}
