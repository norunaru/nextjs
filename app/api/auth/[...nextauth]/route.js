import NextAuth from "next-auth";
import { authOptions } from "../../../lib/authOptions";

const handler = async (req, res) => {
  const options = await authOptions();
  return NextAuth(req, res, options);
};

export { handler as GET, handler as POST };
