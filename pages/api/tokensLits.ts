import type { NextApiResponse, NextApiRequest } from "next";
import tokens from "@/assets/tokenList.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ ...tokens });
}
